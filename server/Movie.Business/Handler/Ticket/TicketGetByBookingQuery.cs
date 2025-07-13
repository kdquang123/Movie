using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class TicketGetByBookingQuery : IRequest<IEnumerable<TicketDetailViewModel>>
{
    public Guid BookingId { get; set; }
}
