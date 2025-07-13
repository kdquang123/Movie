using System;
using MediatR;

namespace Movie.Business.Handler;

public class ApproveTicketCommand : IRequest<bool>
{
    public required string TicketCode { get; set; }
}
