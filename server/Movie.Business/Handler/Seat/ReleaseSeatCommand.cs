using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class ReleaseSeatCommand : IRequest<IEnumerable<SeatHoldViewModel>>
{
    public Guid UserId { get; set; }
    public Guid ShowtimeId { get; set; }
    public Guid SeatId { get; set; }
}
