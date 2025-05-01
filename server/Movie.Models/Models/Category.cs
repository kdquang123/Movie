using System;
using Movie.Models.Models;

namespace Movie.Models;

public class Category : MasterBaseEntity
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public ICollection<FilmCategory> FilmCategories { get; set; } = [];
}
