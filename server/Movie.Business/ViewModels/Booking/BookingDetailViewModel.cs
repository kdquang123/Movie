using System;

namespace Movie.Business.ViewModels;

public class BookingDetailViewModel
{
    public ProductViewModel? Product { get; set; }
    public int Quantity { get; set; }
}
