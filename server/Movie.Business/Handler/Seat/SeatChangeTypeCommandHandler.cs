using System;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class SeatChangeTypeCommandHandler : BaseHandler, IRequestHandler<SeatChangeTypeCommand, bool>
{
    public SeatChangeTypeCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(SeatChangeTypeCommand request, CancellationToken cancellationToken)
    {
        var seat = await _unitOfWork.SeatRepository.GetByIdAsync(request.Id);
        if (seat == null) return false;
        if (request.SeatType < 0 || request.SeatType > 2) return false;  // 0: Normal, 1: Vip, 2: Disabled
        seat.Type = request.SeatType == 0 ? SeatType.Normal : request.SeatType == 1 ? SeatType.Vip : SeatType.Disabled;
        var result = await _unitOfWork.SaveChangesAsync();
        return result > 0;
    }
}
