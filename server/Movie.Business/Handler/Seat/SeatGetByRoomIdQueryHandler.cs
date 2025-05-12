using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class SeatGetByRoomIdQueryHandler : BaseHandler, IRequestHandler<SeatGetByRoomIdQuery, IEnumerable<SeatViewModel>>
{
    public SeatGetByRoomIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<SeatViewModel>> Handle(SeatGetByRoomIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.SeatRepository.GetQuery();
        var seats = await query.Where(s => s.RoomId == request.RoomId).ToListAsync();
        return _mapper.Map<IEnumerable<SeatViewModel>>(seats);
    }
}
