using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class HoldSeatCommandHandler : BaseHandler, IRequestHandler<HoldSeatCommand, IEnumerable<SeatHoldViewModel>>
{
    public HoldSeatCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<SeatHoldViewModel>> Handle(HoldSeatCommand request, CancellationToken cancellationToken)
    {
        SeatHold seatHold;
        var existSeatHold = await _unitOfWork.SeatHoldRepository.GetQuery().Where(sh => sh.ShowtimeId == request.ShowtimeId && sh.UserId == request.UserId).FirstOrDefaultAsync(cancellationToken);
        if (existSeatHold == null)
        {
            seatHold = new SeatHold { SeatId = request.SeatId, ShowtimeId = request.ShowtimeId, UserId = request.UserId, CreatedAt = DateTime.Now, ExpireAt = DateTime.Now.AddMinutes(16) };
        }
        else
        {
            seatHold = new SeatHold { SeatId = request.SeatId, ShowtimeId = request.ShowtimeId, UserId = request.UserId, CreatedAt = DateTime.Now, ExpireAt = existSeatHold.ExpireAt };
        }

        _unitOfWork.SeatHoldRepository.Add(seatHold);
        await _unitOfWork.SaveChangesAsync();
        var result = await _unitOfWork.SeatHoldRepository.GetQuery().ToListAsync();
        return _mapper.Map<IEnumerable<SeatHoldViewModel>>(result);
    }
}
