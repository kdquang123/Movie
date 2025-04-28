using System;

namespace Movie.Models;

public class MasterBaseEntity : BaseEntity, IMasterBaseEntity
{
    public bool IsActive { get; set; } = true;
}
