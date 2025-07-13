using System;

namespace Movie.Business.ViewModels;

public class TicketViewModel
{
    public Guid SeatId { get; set; }
    public SeatViewModel? Seat { get; set; }
    public Guid BookingId { get; set; }
}
