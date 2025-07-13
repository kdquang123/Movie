using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class SeatHoldGetByShowtimeIdQuery : IRequest<IEnumerable<SeatHoldViewModel>>
{
    public Guid ShowtimeId { get; set; }
}
