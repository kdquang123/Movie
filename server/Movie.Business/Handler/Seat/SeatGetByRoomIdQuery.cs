using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class SeatGetByRoomIdQuery : IRequest<IEnumerable<SeatViewModel>>
{
    public Guid RoomId { get; set; }
}
