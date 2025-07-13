using System;
using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Movie.Business.Handler;

public class ChangePasswordCommand : IRequest<bool>
{
    [Required(ErrorMessage = "Không được để trống mật khẩu cũ")]
    public required string OldPassword { get; set; }

    [Required(ErrorMessage = "Không được để trống mật khẩu mới")]
    [MinLength(6, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$",
        ErrorMessage = "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt")]
    public string NewPassword { get; set; } = null!;

    [Required(ErrorMessage = "Không được để trống xác nhận mật khẩu")]
    [Compare("NewPassword", ErrorMessage = "Xác nhận mật khẩu không khớp")]
    public string ConfirmPassword { get; set; } = null!;
}
