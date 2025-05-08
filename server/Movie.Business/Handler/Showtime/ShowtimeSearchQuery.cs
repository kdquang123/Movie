using System;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class ShowtimeSearchQuery : BaseSearchQuery<ShowtimeViewModel>
{
    public string? StartDate { get; set; }
    public string? RoomId { get; set; }
    public string? MovieId { get; set; }
}
