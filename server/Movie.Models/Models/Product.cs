using System;

namespace Movie.Models;

public class Product : MasterBaseEntity
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required decimal Price { get; set; }
    public required string ImageUrl { get; set; }
    public int Quantity { get; set; }
}
