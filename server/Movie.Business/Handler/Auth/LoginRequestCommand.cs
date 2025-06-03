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
    [StringLength(20, ErrorMessage = "Mật khẩu phải có ít nhất {2} ký tự và không quá {1} ký tự", MinimumLength = 6)]
    [DataType(DataType.Password)]
    public required string Password { get; set; }
}
