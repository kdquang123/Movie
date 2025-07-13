using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class MemberGetNewQueryHandler : UserBaseHandler, IRequestHandler<MemberGetNewQuery, IEnumerable<MemberViewModel>>
{
    public MemberGetNewQueryHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<MemberViewModel>> Handle(MemberGetNewQuery request, CancellationToken cancellationToken)
    {
        var members = await _userManager.GetUsersInRoleAsync("User");

        var query = members.AsQueryable();

        query = query.Where(e => e.IsDelete == false);

        var date= DateTime.Now.AddDays(-7);
        query = query.Where(x => DateTime.Now.AddDays(-7) <= x.CreatedAt);
        return _mapper.Map<IEnumerable<MemberViewModel>>(query);
    }
}
