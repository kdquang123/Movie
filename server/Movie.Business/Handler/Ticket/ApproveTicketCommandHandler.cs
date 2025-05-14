using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class ApproveTicketCommandHandler : BaseHandler, IRequestHandler<ApproveTicketCommand, bool>
{
    public ApproveTicketCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(ApproveTicketCommand request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.TicketRepository.GetQuery().Where(t => t.TicketCode == request.TicketCode).Include(t => t.Booking);
        var ticket = await query.FirstOrDefaultAsync(cancellationToken);
        if (ticket == null)
        {
            return false;
        }

        ticket.IsUsed = true;
        if (ticket.Booking!.BookingStatus != BookingStatus.CheckedIn)
        {
            ticket.Booking!.BookingStatus = BookingStatus.CheckedIn;
        }
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
