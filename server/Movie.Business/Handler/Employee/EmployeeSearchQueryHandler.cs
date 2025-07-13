using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Extensions;
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
        // Lấy danh sách employee
        var usersInRole = await _userManager.GetUsersInRoleAsync("Employee");

        var query = usersInRole.AsQueryable();

        query = query.Where(e => e.IsDelete == false);

        // Check keyword not null or empty, then filter
        if (!string.IsNullOrEmpty(request.Keyword))
        {
            query = query.Where(x => x.FullName!.Contains(request.Keyword) || x.Email!.Contains(request.Keyword));
        }

        if (!string.IsNullOrEmpty(request.Status))
        {
            if (request.Status == "active")
            {
                query = query.Where(x => x.IsActive == true);
            }
            else if (request.Status == "off")
            {
                query = query.Where(x => x.IsActive == false);
            }
        }


        // Dem so luong
        int total = query.Count();

        // Sap xep
        if (!string.IsNullOrEmpty(request.OrderBy))
        {
            query = query.OrderByExtension(request.OrderBy, request.OrderDirection.ToString());
        }
        else
        {
            query = query.OrderBy(x => x.CreatedAt);
        }

        // Lay du lieu
        var items = query.Skip(request.PageSize * (request.PageNumber - 1))
            .Take(request.PageSize)
            .ToList();

        // Chuyen du lieu sang view model
        var viewModels = _mapper.Map<IEnumerable<EmployeeViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<EmployeeViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}
