using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class EmployeeGetByIdQueryHandler : UserBaseHandler, IRequestHandler<EmployeeGetByIdQuery, EmployeeViewModel>
{
    public EmployeeGetByIdQueryHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<EmployeeViewModel> Handle(EmployeeGetByIdQuery request, CancellationToken cancellationToken)
    {
        var employee = await _unitOfWork.UserRepository.GetQuery(true)
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.IsDelete == false, cancellationToken: cancellationToken) ?? throw new NotFoundException("Nhân viên không tồn tại");
        return _mapper.Map<EmployeeViewModel>(employee);
    }
}
