using System;
using Movie.Models;

namespace Movie.Business.ViewModels;

public class SeatHoldViewModel
{
    public Guid SeatId { get; set; }
    public Guid ShowtimeId { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
}
