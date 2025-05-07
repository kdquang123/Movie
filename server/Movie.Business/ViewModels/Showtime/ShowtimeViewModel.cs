using System;

namespace Movie.Business.ViewModels;

public class ShowtimeViewModel
{
    public Guid Id { get; set; }
    public Guid FilmId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public Guid RoomId { get; set; }
    public decimal BasePrice { get; set; }
    public decimal WeekendPrice { get; set; }
}
