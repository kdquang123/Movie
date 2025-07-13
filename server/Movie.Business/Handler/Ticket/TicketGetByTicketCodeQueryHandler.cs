using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class TicketGetByTicketCodeQueryHandler : BaseHandler, IRequestHandler<TicketGetByTicketCodeQuery, TicketOfBookingViewModel>
{
    public TicketGetByTicketCodeQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<TicketOfBookingViewModel> Handle(TicketGetByTicketCodeQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.TicketRepository.GetQuery().Where(t => t.TicketCode == request.TicketCode)
        .Include(t => t.Seat)
        .Include(t => t.Booking).ThenInclude(b => b!.Showtime).ThenInclude(st => st!.Film)
        .Include(t => t.Booking).ThenInclude(b => b!.BookingDetails).ThenInclude(bd => bd!.Product)
        .Include(t => t.Booking).ThenInclude(b => b!.Showtime).ThenInclude(st => st!.Room)
        .AsSplitQuery().FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException("Không tìm thấy vé");

        // if (result.IsUsed)
        // {
        //     throw new InvalidOperationException("Vé đã được sử dụng");
        // }
        // var dateNow = DateTime.Now.AddMinutes(-15);

        // if (result.Booking!.Showtime!.StartTime > DateTime.Now.AddMinutes(-15))
        // {
        //     throw new InvalidOperationException("Vé chưa đến giờ chiếu");
        // }

        // if (result.Booking!.Showtime!.StartTime < DateTime.Now.AddMinutes(20))
        // {
        //     throw new InvalidOperationException("Đã quá giờ chiếu để check vé");
        // }

        return _mapper.Map<TicketOfBookingViewModel>(result);
    }
}
