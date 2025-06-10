using System;
using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Movie.Business.ViewModels;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ProfileGetQueryHandler : BaseHandler,
    IRequestHandler<ProfileGetQuery, ProfileViewModel>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    public ProfileGetQueryHandler(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ProfileViewModel> Handle(ProfileGetQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "";
        var user =await _unitOfWork.UserRepository.GetByIdAsync(Guid.Parse(userId));
        if (user == null)
        {
            throw new NotFoundException("Tài khoản không tồn tại");
        }
        return _mapper.Map<ProfileViewModel>(user);
    }
}
