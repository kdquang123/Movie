using System;
using Microsoft.AspNetCore.Identity;

namespace Movie.Models;

public class User : IdentityUser<Guid>, IMasterBaseEntity
{
    public string? FullName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public bool? Gender { get; set; }
    public string? Address { get; set; }
    public int? Point { get; set; } = 0;
    public ICollection<Booking> Bookings { get; set; } = [];
    public DateTime? CreatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsDelete { get; set; } = false;
    public bool IsActive { get; set; } = true;
}
