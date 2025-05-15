using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Movie.Business.Services;
using Movie.Core.Utils;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class EmployeeCreateCommandHandler : UserBaseHandler, IRequestHandler<EmployeeCreateCommand, bool>
{
    private readonly IEmailService _emailService;

    public EmployeeCreateCommandHandler(IEmailService emailService, UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
        _emailService = emailService;
    }

    public async Task<bool> Handle(EmployeeCreateCommand request, CancellationToken cancellationToken)
    {
        var employee = new User
        {
            FullName = request.FullName,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender == 1 ? true : (request.Gender == 0 ? false : null),
            Address = request.Address,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            CreatedAt = DateTime.Now,
            EmailConfirmed = true,
            UserName = request.Email
        };

        var password = PasswordGenerator.GeneratePassword();


        var result = await _userManager.CreateAsync(employee, password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);
            throw new InvalidOperationException($"Failed to create user: {string.Join(", ", errors)}");
        }

        await _userManager.AddToRoleAsync(employee, "Employee");

        var mailContent = $@"
            <h1>Chào mừng đến với KDCinema</h1>
            <p>Tên đăng nhập: {employee.UserName}</p>
            <p>Mật khẩu: {password}</p>
            <p>Nhớ đổi mật khẩu sau lần đầu đăng nhập.</p>
        ";

        await _emailService.SendEmailAsync(employee.Email, "", mailContent);

        return true;
    }


}
