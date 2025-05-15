using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Movie.Business.ViewModels;
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
        var employee = _unitOfWork.UserRepository.GetById(request.Id);
        return _mapper.Map<EmployeeViewModel>(employee);
    }
}
