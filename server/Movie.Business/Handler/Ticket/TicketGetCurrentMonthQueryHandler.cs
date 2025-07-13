using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class TicketGetCurrentMonthQueryHandler : BaseHandler, IRequestHandler<TicketGetCurrentMonthQuery, IEnumerable<TicketViewModel>>
{
    public TicketGetCurrentMonthQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<TicketViewModel>> Handle(TicketGetCurrentMonthQuery request, CancellationToken cancellationToken)
    {
        var currentMonth = DateTime.Now.Month;
        var tickets = await _unitOfWork.TicketRepository.GetQuery().Include(t => t.Booking)
            .Where(t => t.IsDelete == false && t.Booking!.CreatedAt.HasValue &&
                        t.Booking.CreatedAt.Value.Month == currentMonth)
            .ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<TicketViewModel>>(tickets);
    }
}
