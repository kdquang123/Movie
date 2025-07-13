using System;
using Movie.Business.ViewModels.Booking;

namespace Movie.Business.ViewModels;

public class TicketDetailViewModel
{
    public required string TicketCode { get; set; }
    public Guid SeatId { get; set; }
    public SeatViewModel? Seat { get; set; }
    public Guid BookingId { get; set; }
    public BookingOfTicketViewModel? Booking { get; set; }
    public bool IsUsed { get; set; } = false;
}
