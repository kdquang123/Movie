using System;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class RoomUpdateCommandHandler : BaseHandler, IRequestHandler<RoomUpdateCommand, bool>
{
    public RoomUpdateCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(RoomUpdateCommand request, CancellationToken cancellationToken)
    {
        var room = await _unitOfWork.RoomRepository.GetByIdAsync(request.Id);
        if (room == null) return false;
        room.Name = request.Name;
        room.RoomTypeId = request.RoomTypeId;
        var result = await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
