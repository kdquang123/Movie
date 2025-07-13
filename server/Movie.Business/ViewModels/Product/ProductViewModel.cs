using System;

namespace Movie.Business.ViewModels;

public class ProductViewModel
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required decimal Price { get; set; }
    public required string ImageUrl { get; set; }
    public int Quantity { get; set; }
    public bool IsActive { get; set; }
}
