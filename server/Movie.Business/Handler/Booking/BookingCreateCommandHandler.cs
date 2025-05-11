using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.Services;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class BookingCreateCommandHandler : BaseHandler, IRequestHandler<BookingCreateCommand, string>
{
    private readonly IVNPayService _vnPayService;

    public BookingCreateCommandHandler(IVNPayService vnPayService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _vnPayService = vnPayService;
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

        if (request.ProductList != null)
        {

        }

        if (request.PromotionCode != null)
        {

        }

        decimal totalPrice = seatTotalPrice + productTotalPrice;


        var existSeatHold = await _unitOfWork.SeatHoldRepository.GetQuery().Where(sh => sh.ShowtimeId == request.Showtime.Id && sh.UserId == request.UserId).FirstOrDefaultAsync(cancellationToken);
        var newBooking = new Booking
        {
            ShowTimeId = request.Showtime.Id,
            UserId = request.UserId,
            ExpireAt = existSeatHold!.ExpireAt.AddMinutes(-1),
            BookingStatus = BookingStatus.Pending
        };

        if (request.PromotionCode != null)
        {
            newBooking.PromotionCode = request.PromotionCode;
        }

        newBooking.TotalPrice = totalPrice;
        _unitOfWork.BookingRepository.Add(newBooking);
        await _unitOfWork.SaveChangesAsync();

        string paymentUrl = _vnPayService.CreatePaymentUrl(totalPrice, newBooking.Id.ToString());

        return paymentUrl;
    }
}
