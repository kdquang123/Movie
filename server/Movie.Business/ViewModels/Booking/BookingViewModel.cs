using System;
using Movie.Models;

namespace Movie.Business.ViewModels;

public class BookingViewModel
{
    public Guid Id { get; set; }
    public Guid ShowTimeId { get; set; }
    public ShowtimeViewModel? Showtime { get; set; }
    public ICollection<TicketDetailViewModel> Tickets { get; set; } = [];
    public ICollection<BookingDetailViewModel> BookingDetails { get; set; } = [];
    public string? PromotionCode { get; set; }
    public decimal TotalPrice { get; set; }
    public string? BookingStatus { get; set; }
    public required string BookingCode { get; set; }
    public DateTime CreatedAt { get; set; }
}
