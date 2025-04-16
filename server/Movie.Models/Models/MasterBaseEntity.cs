using System;

namespace Movie.Models.Models;

public class MasterBaseEntity : BaseEntity, IMasterBaseEntity
{
    public bool IsActive { get; set; } = true;
}
