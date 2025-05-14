using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class TicketGetByUserIdQueryHandler : BaseHandler, IRequestHandler<TicketGetByUserIdQuery, IEnumerable<TicketDetailViewModel>>
{
    public TicketGetByUserIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<TicketDetailViewModel>> Handle(TicketGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.TicketRepository.GetQuery();
        query = query.Include(t => t.Booking).ThenInclude(b => b.Showtime).Include(t => t.Seat);
        var result = await query.Where(t => t.Booking!.UserId == request.UserId).ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<TicketDetailViewModel>>(result);
    }
}
