using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class SeatHoldGetByShowtimeIdQueryHandler : BaseHandler, IRequestHandler<SeatHoldGetByShowtimeIdQuery, IEnumerable<SeatHoldViewModel>>
{
    public SeatHoldGetByShowtimeIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<SeatHoldViewModel>> Handle(SeatHoldGetByShowtimeIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.SeatHoldRepository.GetQuery();
        var seatHolds = await query.Where(sh => sh.ShowtimeId == request.ShowtimeId).ToListAsync();
        return _mapper.Map<IEnumerable<SeatHoldViewModel>>(seatHolds);
    }
}
