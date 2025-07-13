using System;

namespace Movie.Business.ViewModels.Booking;

public class BookingOfTicketViewModel
{
    public Guid Id { get; set; }
    public Guid ShowTimeId { get; set; }
    public ShowtimeViewModel? Showtime { get; set; }
    public string? PromotionCode { get; set; }
    public decimal TotalPrice { get; set; }
    public string? BookingStatus { get; set; }
    public required string BookingCode { get; set; }
    public DateTime CreatedAt { get; set; }
    public MemberViewModel? User { get; set; }
}
