using System;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class TicketSearchQuery : BaseSearchQuery<TicketDetailViewModel>
{
    public string CustomerName { get; set; } = "";
    public string Status { get; set; } = "";
}
