using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class EmployeeUpdateCommandHandler : UserBaseHandler, IRequestHandler<EmployeeUpdateCommand, bool>
{
    public EmployeeUpdateCommandHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(EmployeeUpdateCommand request, CancellationToken cancellationToken)
    {
        var employee = _unitOfWork.UserRepository.GetById(request.Id) ?? throw new NotFoundException("Không tìm thấy nhân viên");

        employee.FullName = request.FullName;
        employee.DateOfBirth = request.DateOfBirth;
        employee.Gender = request.Gender == 1 ? true : (request.Gender == 0 ? false : null);
        employee.Address = request.Address;
        employee.Email = request.Email;
        employee.PhoneNumber = request.PhoneNumber;

        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
