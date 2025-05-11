using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models;

public class Booking : BaseEntity
{
    [ForeignKey(nameof(Showtime))]
    public Guid ShowTimeId { get; set; }
    public Showtime? Showtime { get; set; }
    public ICollection<Ticket> Tickets { get; set; } = [];
    public ICollection<BookingDetail> BookingDetails { get; set; } = [];
    public string? PromotionCode { get; set; }
    public decimal TotalPrice { get; set; }
    public BookingStatus BookingStatus { get; set; }
    [ForeignKey(nameof(User))]
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public DateTime ExpireAt { get; set; }
}

public enum BookingStatus
{
    Pending,   // Mới đặt, chưa thanh toán
    Paid,      // Thanh toán thành công
    CheckedIn, // Đã check-in vé đầu tiên (combo giao rồi)
    Cancelled  // Thanh toán thất bại hoặc bị timeout
}
