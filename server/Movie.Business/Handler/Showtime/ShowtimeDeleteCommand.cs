using System;
using MediatR;

namespace Movie.Business.Handler;

public class ShowtimeDeleteCommand : IRequest<bool>
{
    public Guid Id { get; set; }
}