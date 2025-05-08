using System;
using MediatR;

namespace Movie.Business.Handler;

public class ShowtimeCreateCommand : IRequest<bool>
{
    public required Guid MovieId { get; set; }
    public required Guid RoomId { get; set; }
    public required DateTime StartDate { get; set; }
    public required string StartTime { get; set; }
    public required decimal BasePrice { get; set; }
    public required decimal WeekendPrice { get; set; }
    public required int Duration { get; set; }
}
