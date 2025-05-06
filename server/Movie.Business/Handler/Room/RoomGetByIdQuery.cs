using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class RoomGetByIdQuery : IRequest<RoomViewModel>
{
    public required Guid Id { get; set; }
}
