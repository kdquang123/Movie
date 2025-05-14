using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class TicketGetByShowtimeQuery : IRequest<IEnumerable<TicketViewModel>>
{
    public Guid ShowtimeId { get; set; }
}
