using System;

namespace Movie.Models;

public class Category : MasterBaseEntity
{
    public required string Name { get; set; }
    public string? Description { get; set; }
}
