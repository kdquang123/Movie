using System;

namespace Movie.Models;

public class BookingDetail
{
    public Guid BookingId { get; set; }
    public Booking? Booking { get; set; }
    public Guid ProductId { get; set; }
    public Product? Product { get; set; }
    public required int Quantity { get; set; }
    public decimal ProductPrice { get; set; }
}
