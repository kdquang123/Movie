using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.Services;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class BookingCreateCommandHandler : BaseHandler, IRequestHandler<BookingCreateCommand, string>
{
    private readonly IVNPayService _vnPayService;
    private readonly IMomoService _momoService;


    public BookingCreateCommandHandler(IVNPayService vnPayService, IMomoService momoService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _vnPayService = vnPayService;
        _momoService = momoService;
    }

    public async Task<string> Handle(BookingCreateCommand request, CancellationToken cancellationToken)
    {
        var seatBasePrice = (request.Showtime.StartTime.DayOfWeek == DayOfWeek.Saturday || request.Showtime.StartTime.DayOfWeek == DayOfWeek.Sunday) ? request.Showtime.WeekendPrice : request.Showtime.BasePrice;
        decimal seatTotalPrice = 0;
        decimal productTotalPrice = 0;


        foreach (var seat in request.SeatList)
        {
            if (seat.Type == SeatType.Vip.ToString())
            {
                seatTotalPrice += seatBasePrice + request.Showtime.Room!.RoomType!.ExtraPrice;
            }
            else
            {
                seatTotalPrice += seatBasePrice;
            }
        }

        if (request.ProductList != null && request.ProductList.Length > 0)
        {
            foreach (var bookingDetail in request.ProductList)
            {
                productTotalPrice += bookingDetail.Product!.Price * bookingDetail.Quantity;
            }
        }

        decimal totalPrice = seatTotalPrice + productTotalPrice;

        if (!String.IsNullOrEmpty(request.PromotionCode))
        {
            var promotion = await _unitOfWork.PromotionRepository.GetQuery()
           .FirstOrDefaultAsync(x => x.Code == request.PromotionCode && x.IsDelete == false, cancellationToken: cancellationToken)
           ?? throw new NotFoundException("Khuyến mãi không tồn tại");

            if (promotion.EndDate < DateTime.Now)
            {
                throw new NotFoundException("Khuyến mãi đã kết thúc");
            }

            if (promotion.StartDate > DateTime.Now)
            {
                throw new NotFoundException("Khuyến mãi chưa bắt đầu");
            }

            if (promotion.MinOrderAmount != null && promotion.MinOrderAmount > totalPrice)
            {
                throw new NotFoundException("Giá trị đơn hàng không đủ để áp dụng khuyến mãi");
            }

            if (promotion.UsageLimit != null)
            {
                var usageCount = await _unitOfWork.BookingRepository.GetQuery()
                    .CountAsync(b => b.PromotionCode == request.PromotionCode && b.BookingStatus == BookingStatus.Paid, cancellationToken);
                if (usageCount >= promotion.UsageLimit)
                    throw new NotFoundException("Khuyến mãi đã hết lượt sử dụng");
            }


            if (promotion.DiscountType == PromotionType.Percentage.ToString())
            {
                totalPrice -= totalPrice * (promotion.DiscountValue / 100);
            }
            else if (promotion.DiscountType == PromotionType.FixedAmount.ToString())
            {
                totalPrice -= promotion.DiscountValue;
            }
        }


        var bookingCode = "ORD" + DateTime.UtcNow.Ticks.ToString().Substring(0, 10);
        var existSeatHold = await _unitOfWork.SeatHoldRepository.GetQuery().Where(sh => sh.ShowtimeId == request.Showtime.Id && sh.UserId == request.UserId).FirstOrDefaultAsync(cancellationToken);
        var newBooking = new Booking
        {
            ShowTimeId = request.Showtime.Id,
            UserId = request.UserId,
            ExpireAt = existSeatHold!.ExpireAt,
            BookingStatus = BookingStatus.Pending,
            BookingCode = bookingCode,
            CreatedAt = DateTime.Now
        };

        if (!String.IsNullOrEmpty(request.PromotionCode))
        {
            newBooking.PromotionCode = request.PromotionCode;
        }

        if (request.ProductList != null && request.ProductList.Length > 0)
        {
            foreach (var bookingDetail in request.ProductList)
            {
                newBooking.BookingDetails.Add(new BookingDetail
                {
                    ProductId = bookingDetail.Product!.Id,
                    Quantity = bookingDetail.Quantity,
                    ProductPrice = bookingDetail.Product!.Price,
                });
            }
        }

        newBooking.TotalPrice = totalPrice;
        _unitOfWork.BookingRepository.Add(newBooking);
        await _unitOfWork.SaveChangesAsync();

        string paymentUrl;

        if (request.PaymentMethod == "Momo")
        {
            paymentUrl = await _momoService.CreatePaymentAsync(newBooking);
            return paymentUrl;
        }
        paymentUrl = _vnPayService.CreatePaymentUrl(newBooking);

        return paymentUrl;
    }
}
