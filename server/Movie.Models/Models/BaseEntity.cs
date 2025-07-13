using System;

namespace Movie.Models;

public class BaseEntity : IBaseEntity
{
    public Guid Id { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsDelete { get; set; } = false;
}
