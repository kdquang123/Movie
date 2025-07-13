using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class EmployeeGetAllQueryHandler : UserBaseHandler, IRequestHandler<EmployeeGetAllQuery, IEnumerable<EmployeeViewModel>>
{
    public EmployeeGetAllQueryHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<EmployeeViewModel>> Handle(EmployeeGetAllQuery request, CancellationToken cancellationToken)
    {
        var employees = await _userManager.GetUsersInRoleAsync("Employee");
        return _mapper.Map<IEnumerable<EmployeeViewModel>>(employees);
    }
}
