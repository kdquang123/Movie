using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class MemberGetAllQueryHandler : UserBaseHandler, IRequestHandler<MemberGetAllQuery, IEnumerable<MemberViewModel>>
{
    public MemberGetAllQueryHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<MemberViewModel>> Handle(MemberGetAllQuery request, CancellationToken cancellationToken)
    {
        var members = await _userManager.GetUsersInRoleAsync("User");
        return _mapper.Map<IEnumerable<MemberViewModel>>(members);
    }
}
