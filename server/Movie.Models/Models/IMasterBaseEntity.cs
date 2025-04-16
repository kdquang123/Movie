using System;

namespace Movie.Models.Models;

public interface IMasterBaseEntity : IBaseEntity
{
    bool IsActive { get; set; }
}
