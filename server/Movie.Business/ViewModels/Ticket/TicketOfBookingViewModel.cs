using System;

namespace Movie.Business.ViewModels;

public class TicketOfBookingViewModel
{
    public required string TicketCode { get; set; }
    public Guid SeatId { get; set; }
    public SeatViewModel? Seat { get; set; }
    public Guid BookingId { get; set; }
    public BookingViewModel? Booking { get; set; }
    public bool IsUsed { get; set; } = false;
}
