using System;
using MediatR;
using Movie.Business.ViewModels.Auth;

namespace Movie.Business.Handler;

public class RefreshTokenCommand : IRequest<LoginResponse>
{
    public required string RefreshToken { get; set; }
}
