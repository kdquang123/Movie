using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models;

public class SeatHold : BaseEntity
{
    [ForeignKey(nameof(Booking))]
    public Guid? BookingId { get; set; }
    public Booking? Booking { get; set; }
    public Guid SeatId { get; set; }
    public Guid ShowtimeId { get; set; }
    public SeatHoldStatus Status { get; set; }
}

public enum SeatHoldStatus
{
    Holding,
    Confirmed,
}
