using System;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Movie.Business.Services;
using Movie.Business.ViewModels.Auth;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class RefreshTokenCommandHandler : UserBaseHandler, IRequestHandler<RefreshTokenCommand, LoginResponse>
{
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;
    public RefreshTokenCommandHandler(IConfiguration configuration, ITokenService tokenService, UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
        _tokenService = tokenService;
        _configuration = configuration;
    }

    public async Task<LoginResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var refreshToken = _unitOfWork.RefreshTokenRepository.GetQuery()
            .FirstOrDefault(x => x.Token == request.RefreshToken);

        if (refreshToken == null || refreshToken.ExpiryDate < DateTime.Now || refreshToken.IsRevoked)
        {
            throw new UnauthorizedAccessException("Refresh token không hợp lệ");
        }

        var user = await _userManager.FindByIdAsync(refreshToken.UserId.ToString())
            ?? throw new UnauthorizedAccessException("Người dùng không tồn tại");

        var roles = await _userManager.GetRolesAsync(user);

        var userInfo = new UserInformation
        {
            Id = user.Id,
            Username = user.UserName ?? string.Empty,
            FullName = user.FullName,
            Email = user.Email,
            Roles = [.. roles]
        };

        var accessToken = await _tokenService.GenerateTokenAsync(user, roles);

        // Generate new refresh token
        var refreshTokenEntity = await _tokenService.GenerateRefreshTokenAsync(user.Id);

        // Get token expiration from config
        if (!int.TryParse(_configuration["JWT:AccessTokenExpiryMinutes"], out var expiryMinutes))
        {
            expiryMinutes = 15;
        }

        // Return response
        return new LoginResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshTokenEntity.Token,
            ExpiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes),
            UserInfo = new UserInformation
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                Roles = roles
            }
        };
    }
}