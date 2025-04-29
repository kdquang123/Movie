using System;

namespace Movie.Models;

public class AgeRestriction : BaseEntity
{
    public required string Code { get; set; }
    public required string Description { get; set; }
    public int? MinAge { get; set; }
}
