using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models;

public class Seat : BaseEntity
{
    public int Row { get; set; }
    public int Column { get; set; }
    public string? SeatName { get; set; }
    public SeatType Type { get; set; }
    [ForeignKey(nameof(Room))]
    public Guid RoomId { get; set; }
    public Room? Room { get; set; }
    public ICollection<Ticket> Tickets { get; set; } = [];
}

public enum SeatType
{
    Vip,
    Normal,
    Disabled,
}
