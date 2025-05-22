using System;

namespace Movie.Business.ViewModels;

public class NewsViewModel
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required string ImageUrl { get; set; }
    public required string Category { get; set; }
    public DateTime CreatedAt { get; set; }
}
