using System;
using MediatR;

namespace Movie.Business.Handler;

public class RoomCreateCommand : IRequest<bool>
{
    public required string Name { get; set; }
    public required int TotalRows { get; set; }
    public required int TotalColumns { get; set; }
    public Guid RoomTypeId { get; set; }
}
