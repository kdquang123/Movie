using System;

namespace Movie.Models;

public interface IBaseEntity
{
    Guid Id { get; set; }
    DateTime? CreatedAt { get; set; }
    DateTime? DeletedAt { get; set; }
    DateTime? UpdatedAt { get; set; }
    bool IsDelete { get; set; }
}
