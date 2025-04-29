using System;

namespace Movie.Models;

public interface IMasterBaseEntity : IBaseEntity
{
    bool IsActive { get; set; }
}
