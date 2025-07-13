using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class TicketGetByShowtimeQueryHandler : BaseHandler, IRequestHandler<TicketGetByShowtimeQuery, IEnumerable<TicketViewModel>>
{
    public TicketGetByShowtimeQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<TicketViewModel>> Handle(TicketGetByShowtimeQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.TicketRepository.GetQuery();
        query = query.Include(t => t.Booking).Include(t => t.Seat);
        var result = await query.Where(t => t.Booking!.ShowTimeId == request.ShowtimeId).ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<TicketViewModel>>(result);
    }
}
