using System;

namespace Movie.Models;

public class Room : MasterBaseEntity
{
    public required string Name { get; set; }
    public int SeatQuantity { get; set; }
    public int TotalRows { get; set; }
    public int TotalColumns { get; set; }
    public ICollection<Seat>? Seats { get; set; }
    public Guid RoomTypeId { get; set; }
    public RoomType? RoomType { get; set; }
}
