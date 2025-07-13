using System;
using MediatR;

namespace Movie.Business.Handler.Auth;

public class LogoutRequestCommand : IRequest<bool>
{
    public required string RefreshToken { get; set; }
}
