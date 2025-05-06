using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models;

public class Showtime : MasterBaseEntity
{
    [ForeignKey(nameof(Film))]
    public Guid FilmId { get; set; }
    public Film? Film { get; set; }
    public DateTime DateTime { get; set; }
    [ForeignKey(nameof(Room))]
    public Guid RoomId { get; set; }
    public Room? Room { get; set; }
    public decimal BasePrice { get; set; }
    public decimal WeekendPrice { get; set; }
}
