using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class EmployeeDeleteCommandHandler : UserBaseHandler, IRequestHandler<EmployeeDeleteCommand, bool>
{
    public EmployeeDeleteCommandHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(EmployeeDeleteCommand request, CancellationToken cancellationToken)
    {
        var employee = _unitOfWork.UserRepository.GetQuery().Where(e => e.Id == request.Id).FirstOrDefault() ?? throw new NotFoundException("Nhân viên không tồn tại");

        employee.DeletedAt = DateTime.Now;
        employee.IsDelete = true;
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
