using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Movie.Business.ViewModels;
using Movie.Core.ViewModels;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class EmployeeSearchQueryHandler : UserBaseHandler, IRequestHandler<EmployeeSearchQuery, PaginatedResult<EmployeeViewModel>>
{
    public EmployeeSearchQueryHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<EmployeeViewModel>> Handle(EmployeeSearchQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
