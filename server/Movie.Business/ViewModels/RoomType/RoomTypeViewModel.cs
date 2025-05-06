using System;

namespace Movie.Business.ViewModels;

public class RoomTypeViewModel
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal ExtraPrice { get; set; }
}
