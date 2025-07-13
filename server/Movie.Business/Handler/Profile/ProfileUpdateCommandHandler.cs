using System;
using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class ProfileUpdateCommandHandler : UserBaseHandler, IRequestHandler<ProfileUpdateCommand, bool>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    public ProfileUpdateCommandHandler(IHttpContextAccessor httpContextAccessor, UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<bool> Handle(ProfileUpdateCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "";
        var user = _unitOfWork.UserRepository.GetById(Guid.Parse(userId)) ?? throw new NotFoundException("Tài khoản không tồn tại");

        user.FullName = request.FullName;
        user.DateOfBirth = request.DateOfBirth;
        user.Gender = request.Gender == 1 ? true : (request.Gender == 0 ? false : null);
        user.Address = request.Address;
        user.PhoneNumber = request.PhoneNumber;

        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}

