using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models;

public class Ticket : BaseEntity
{
    public required string TicketCode { get; set; }
    [ForeignKey(nameof(Seat))]
    public Guid SeatId { get; set; }
    public Seat? Seat { get; set; }
    [ForeignKey(nameof(Booking))]
    public Guid BookingId { get; set; }
    public Booking? Booking { get; set; }
    public bool IsUsed { get; set; } = false;
}

