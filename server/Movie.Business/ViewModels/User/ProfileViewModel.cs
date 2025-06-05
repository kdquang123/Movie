using System;

namespace Movie.Business.ViewModels;

public class ProfileViewModel
{
    public required string FullName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public bool? Gender { get; set; }
    public string? Address { get; set; }
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
}
