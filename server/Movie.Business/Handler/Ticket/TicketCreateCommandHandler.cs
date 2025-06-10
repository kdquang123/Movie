using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.ObjectPool;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class TicketCreateCommandHandler : BaseHandler, IRequestHandler<TicketCreateCommand, bool>
{
    public TicketCreateCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(TicketCreateCommand request, CancellationToken cancellationToken)
    {
        var booking = await _unitOfWork.BookingRepository.GetQuery().Where(b => b.BookingCode == request.BookingCode).FirstOrDefaultAsync(cancellationToken);
        booking!.BookingStatus = BookingStatus.Paid;

        var listHoldingSeats = await _unitOfWork.SeatHoldRepository.GetQuery().Where(sh => sh.ShowtimeId == booking!.ShowTimeId && sh.UserId == booking!.UserId).ToListAsync(cancellationToken);
        foreach (var seatHold in listHoldingSeats)
        {
            var uniqueTicketCode = await GenerateUniqueTicketCodeAsync();
            var ticket = new Ticket { TicketCode = uniqueTicketCode, SeatId = seatHold.SeatId, BookingId = booking.Id, CreatedAt = DateTime.Now };
            booking.Tickets.Add(ticket);
        }
        await _unitOfWork.SaveChangesAsync();
        return true;
    }


    private async Task<string> GenerateUniqueTicketCodeAsync()
    {
        string ticketCode;
        bool isDuplicate;

        do
        {
            ticketCode = GenerateTicketCode();
            isDuplicate = await _unitOfWork.TicketRepository
                .GetQuery()
                .AnyAsync(t => t.TicketCode == ticketCode);
        }
        while (isDuplicate);

        return ticketCode;
    }

    private string GenerateTicketCode()
    {
        string datetimePart = DateTime.UtcNow.ToString("yyMMdd-HHmm");
        string randomPart = Guid.NewGuid().ToString("N")[..6].ToUpper();

        return $"TICKET-{datetimePart}-{randomPart}";
    }
}
