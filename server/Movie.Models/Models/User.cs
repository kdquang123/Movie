using System;
using Microsoft.AspNetCore.Identity;

namespace Movie.Models.Models;

public class User : IdentityUser<int>, IMasterBaseEntity
{
    public DateTime? CreatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsDelete { get; set; } = false;
    public bool IsActive { get; set; } = true;
}
