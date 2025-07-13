using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class RoomGetByIdQueryHandler : BaseHandler, IRequestHandler<RoomGetByIdQuery, RoomViewModel>
{
    public RoomGetByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<RoomViewModel> Handle(RoomGetByIdQuery request, CancellationToken cancellationToken)
    {
        var room = await _unitOfWork.RoomRepository.GetQuery()
            .Include(r => r.RoomType)
            .Include(r => r.Seats)
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.IsDelete == false, cancellationToken: cancellationToken) ?? throw new NotFoundException("Phòng không tồn tại");
        return _mapper.Map<RoomViewModel>(room);
    }
}
