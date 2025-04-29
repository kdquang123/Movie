using System;
using Microsoft.AspNetCore.Identity;

namespace Movie.Models;

public class Role : IdentityRole<Guid>, IMasterBaseEntity
{
    public bool IsActive { get; set; } = true;
    public DateTime? CreatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsDelete { get; set; } = false;
}
