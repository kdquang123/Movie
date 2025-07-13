using System;
using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Movie.Business.Handler;

public class EmployeeUpdateCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    [Required(ErrorMessage = "Họ tên không được bỏ trống")]
    public required string FullName { get; set; }
    [Required(ErrorMessage = "Ngày sinh không được bỏ trống")]
    public required DateTime DateOfBirth { get; set; }
    [Required(ErrorMessage = "Giới tính không được bỏ trống")]
    public required int Gender { get; set; }
    public string? Address { get; set; }
    [Required(ErrorMessage = "Email không được bỏ trống")]
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
}
