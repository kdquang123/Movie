using System;
using MediatR;

namespace Movie.Business.Handler;

public class ShowtimeCreateCommand : IRequest<bool>
{
    public Guid MovieId { get; set; }
    public Guid RoomId { get; set; }
    public DateTime StartTime { get; set; }
    public decimal BasePrice { get; set; }
    public decimal WeekendPrice { get; set; }
    public int Duration { get; set; }

}
