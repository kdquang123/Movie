using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ReleaseAllSeatCommandHandler : BaseHandler, IRequestHandler<ReleaseAllSeatCommand, bool>
{
    public ReleaseAllSeatCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(ReleaseAllSeatCommand request, CancellationToken cancellationToken)
    {
        var seatHoldList = await _unitOfWork.SeatHoldRepository.GetQuery().Where(x => x.ShowtimeId == request.ShowtimeId && x.UserId == request.UserId).ToListAsync(cancellationToken);
        _unitOfWork.Context.SeatHolds.RemoveRange(seatHoldList);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
