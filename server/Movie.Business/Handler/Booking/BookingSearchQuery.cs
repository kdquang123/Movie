using System;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class BookingSearchQuery : BaseSearchQuery<BookingViewModel>
{
    public string CustomerName { get; set; } = "";
    public string Status { get; set; } = "";
}

