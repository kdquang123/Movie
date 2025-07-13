using System;
using System.Security.Cryptography;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ReleaseSeatCommandHandler : BaseHandler, IRequestHandler<ReleaseSeatCommand, IEnumerable<SeatHoldViewModel>>
{
    public ReleaseSeatCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<SeatHoldViewModel>> Handle(ReleaseSeatCommand request, CancellationToken cancellationToken)
    {
        await _unitOfWork.SeatHoldRepository.GetQuery().Where(sh => sh.SeatId == request.SeatId && sh.ShowtimeId == request.ShowtimeId && sh.UserId == request.UserId).ExecuteDeleteAsync();
        await _unitOfWork.SaveChangesAsync();
        var result = await _unitOfWork.SeatHoldRepository.GetQuery().ToListAsync();
        return _mapper.Map<IEnumerable<SeatHoldViewModel>>(result);
    }
}
