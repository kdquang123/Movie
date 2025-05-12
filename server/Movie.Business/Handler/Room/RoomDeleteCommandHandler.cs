using System;
using Amazon.Runtime.Internal;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class RoomDeleteCommandHandler : BaseHandler, IRequestHandler<RoomDeleteCommand, bool>
{
    public RoomDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(RoomDeleteCommand request, CancellationToken cancellationToken)
    {
        var room = await _unitOfWork.RoomRepository.GetByIdAsync(request.Id);
        if (room == null) return false;
        room.IsDelete = true;
        room.DeletedAt = DateTime.Now;
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
