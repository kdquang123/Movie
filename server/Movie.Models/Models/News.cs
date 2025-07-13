using System;

namespace Movie.Models;

public class News : MasterBaseEntity
{
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required string ImageUrl { get; set; }
    public required NewsCategory Category { get; set; }
}

public enum NewsCategory
{
    News,
    Promotion,
    Event
}