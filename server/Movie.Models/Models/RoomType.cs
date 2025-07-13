using System;

namespace Movie.Models;

public class RoomType : MasterBaseEntity
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal ExtraPrice { get; set; }
    public ICollection<Room> Rooms { get; set; } = [];
}
