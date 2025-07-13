using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Movie.Business.ViewModels.Auth;

namespace Movie.Business.Handler.Auth;

public class LoginRequestCommand : IRequest<LoginResponse>
{
    [Required(ErrorMessage = "Tên đăng nhập không được bỏ trống")]
    public required string Username { get; set; }

    [Required(ErrorMessage = "Mật khẩu không được bỏ trống")]
    [MinLength(6, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$",
        ErrorMessage = "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt")]
    [DataType(DataType.Password)]
    public required string Password { get; set; }
}
