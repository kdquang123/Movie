using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models;

public class SeatHold : BaseEntity
{
    public Guid SeatId { get; set; }
    public Guid ShowtimeId { get; set; }
    [ForeignKey(nameof(User))]
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public DateTime ExpireAt { get; set; }
}