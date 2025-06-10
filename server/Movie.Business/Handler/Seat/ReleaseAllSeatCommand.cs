using System;
using Amazon.Runtime.Internal;
using MediatR;

namespace Movie.Business.Handler;

public class ReleaseAllSeatCommand : IRequest<bool>
{
    public Guid ShowtimeId { get; set; }
    public Guid UserId { get; set; }
}
