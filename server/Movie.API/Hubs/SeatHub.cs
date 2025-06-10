using System;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Movie.Business.Handler;

namespace Movie.API.Hubs;

public class SeatHub : Hub
{
    private readonly IMediator _mediator;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SeatHub(IHttpContextAccessor httpContextAccessor, IMediator mediator)
    {
        _mediator = mediator;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task JoinShowtimeGroup(string showtimeId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, showtimeId);
        var seatHoldList = await _mediator.Send(new SeatHoldGetByShowtimeIdQuery { ShowtimeId = Guid.Parse(showtimeId) });
        await Clients.Caller.SendAsync("ReceiveHeldSeats", seatHoldList);
    }

    public async Task LeaveShowtimeGroup(string showtimeId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, showtimeId);
    }

    public async Task HoldSeats(HoldSeatCommand command)
    {
        var result = await _mediator.Send(command);
        await Clients.Group(command.ShowtimeId.ToString())
             .SendAsync("ReceiveHeldSeats", result);
    }

    public async Task ReleaseSeat(ReleaseSeatCommand command)
    {
        var result = await _mediator.Send(command);
        await Clients.Group(command.ShowtimeId.ToString())
            .SendAsync("ReceiveHeldSeats", result);
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        return base.OnDisconnectedAsync(exception);
    }
}
