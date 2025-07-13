using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class TicketGetByUserIdQuery : IRequest<IEnumerable<TicketDetailViewModel>>
{
    public Guid UserId { get; set; }
}
