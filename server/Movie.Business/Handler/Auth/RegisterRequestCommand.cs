using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Movie.Business.ViewModels.Auth;

namespace Movie.Business.Handler;

public class RegisterRequestCommand : IRequest<LoginResponse>
{
    [Required(ErrorMessage = "Tên không được bỏ trống")]
    [StringLength(50, ErrorMessage = "Tên không được quá 50 ký tự", MinimumLength = 1)]
    public required string FullName { get; set; }

    [Required(ErrorMessage = "Email không được bỏ trống")]
    [EmailAddress(ErrorMessage = "Email không hợp lệ")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "Mật khẩu không được bỏ trống")]
    [StringLength(100, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự", MinimumLength = 6)]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$",
        ErrorMessage = "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt")]
    [DataType(DataType.Password)]
    public required string Password { get; set; }

    [Required(ErrorMessage = "Mật khẩu xác nhận không được bỏ trống")]
    [Compare("Password", ErrorMessage = "Mật khẩu xác thực không khớp nhau")]
    public required string ConfirmPassword { get; set; }
}
