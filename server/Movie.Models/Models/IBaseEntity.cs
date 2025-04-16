using System;

namespace Movie.Models.Models;

public interface IBaseEntity
{
    int Id { get; set; }
    DateTime? CreatedAt { get; set; }
    DateTime? DeletedAt { get; set; }
    DateTime? UpdatedAt { get; set; }
    bool IsDelete { get; set; }
}
