using System;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class UserBaseHandler : BaseHandler
{
    public readonly UserManager<User> _userManager;
    public readonly RoleManager<Role> _roleManager;

    public UserBaseHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }
}
