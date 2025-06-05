using System;
using MediatR;

namespace Movie.Business.Handler;

public class ChangeUserStatusCommand : IRequest<bool>
{
    public Guid UserId { get; set; }
}
