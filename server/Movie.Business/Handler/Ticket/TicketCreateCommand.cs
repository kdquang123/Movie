using System;
using MediatR;

namespace Movie.Business.Handler;

public class TicketCreateCommand : IRequest<bool>
{
    public required string BookingCode { get; set; }
}
