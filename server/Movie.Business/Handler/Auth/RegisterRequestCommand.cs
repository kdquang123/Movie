using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Movie.Business.ViewModels.Auth;

namespace Movie.Business.Handler;

public class RegisterRequestCommand : IRequest<LoginResponse>
{
    [Required(ErrorMessage = "{0} is required")]
    [StringLength(50, ErrorMessage = "{0} must be between {2} and {1} characters", MinimumLength = 1)]
    public required string FullName { get; set; }

    [Required(ErrorMessage = "{0} is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "{0} is required")]
    [StringLength(100, ErrorMessage = "{0} must be between {2} and {1} characters", MinimumLength = 6)]
    [DataType(DataType.Password)]
    public required string Password { get; set; }

    [Required(ErrorMessage = "{0} is required")]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match")]
    public required string ConfirmPassword { get; set; }
}
