using System;
using MediatR;

namespace Movie.Business.Handler;

public class RoomDeleteCommand : IRequest<bool>
{
    public required Guid Id { get; set; }
}
