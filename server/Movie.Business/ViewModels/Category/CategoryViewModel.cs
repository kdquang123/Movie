using System;

namespace Movie.Business.ViewModels;

public class CategoryViewModel
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
}
