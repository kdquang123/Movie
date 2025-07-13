using System;
using AutoMapper;
using MediatR;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class RoomUpdateCommandHandler : BaseHandler, IRequestHandler<RoomUpdateCommand, bool>
{
    public RoomUpdateCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(RoomUpdateCommand request, CancellationToken cancellationToken)
    {
        var room = await _unitOfWork.RoomRepository.GetByIdAsync(request.Id) ?? throw new NotFoundException("Phòng không tồn tại");
        room.Name = request.Name;
        room.RoomTypeId = request.RoomTypeId;
        room.UpdatedAt = DateTime.Now;
        var result = await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
