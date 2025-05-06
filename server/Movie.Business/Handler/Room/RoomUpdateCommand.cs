using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class RoomUpdateCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required Guid RoomTypeId { get; set; }
}
