using System;
using MediatR;
using Movie.Business.Services;

namespace Movie.Business.Handler.Auth;

public class LogoutRequestCommandHandler : IRequestHandler<LogoutRequestCommand, bool>
{
    private readonly ITokenService _tokenService;
    public LogoutRequestCommandHandler(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    public async Task<bool> Handle(LogoutRequestCommand request, CancellationToken cancellationToken)
    {
        return await _tokenService.RevokeRefreshTokenAsync(request.RefreshToken);
    }
}
