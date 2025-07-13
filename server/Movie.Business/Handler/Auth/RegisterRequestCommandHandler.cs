using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Movie.Business.Services;
using Movie.Business.ViewModels.Auth;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class RegisterRequestCommandHandler : BaseHandler, IRequestHandler<RegisterRequestCommand, LoginResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;

    public RegisterRequestCommandHandler(
        IUnitOfWork unitOfWork,
        IMapper mapper,
        UserManager<User> userManager,
        ITokenService tokenService,
        IConfiguration configuration) : base(unitOfWork, mapper)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _configuration = configuration;
    }
    public async Task<LoginResponse> Handle(RegisterRequestCommand request, CancellationToken cancellationToken)
    {
        // Check if user with this username or email already exists
        var existingUserByName = await _userManager.FindByNameAsync(request.Email);
        if (existingUserByName != null)
        {
            throw new InvalidOperationException("Email đã tồn tại");
        }

        var existingUserByEmail = await _userManager.FindByEmailAsync(request.Email);
        if (existingUserByEmail != null)
        {
            throw new InvalidOperationException("Email đã tồn tại");
        }

        // Create new user
        var user = new User
        {
            UserName = request.Email,
            Email = request.Email,
            FullName = request.FullName,
            IsActive = true,
            EmailConfirmed = true, // In production, implement email confirmation
            CreatedAt = DateTime.Now,
        };

        // Add the user using UserManager
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);
            throw new InvalidOperationException($"Tạo tài khoản thất bại: {string.Join(", ", errors)}");
        }

        // Assign default role
        await _userManager.AddToRoleAsync(user, "User");

        // Get user roles
        var userRoles = await _userManager.GetRolesAsync(user);

        // Generate access token
        var accessToken = await _tokenService.GenerateTokenAsync(user, userRoles);

        // Generate refresh token
        var refreshToken = await _tokenService.GenerateRefreshTokenAsync(user.Id);

        // Get token expiration from config
        if (!int.TryParse(_configuration["JWT:AccessTokenExpiryMinutes"], out var expiryMinutes))
        {
            expiryMinutes = 15;
        }

        // Return login response
        return new LoginResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token,
            ExpiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes),
            UserInfo = new UserInformation
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                Roles = userRoles
            }
        };
    }
}
