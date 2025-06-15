using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TicketsController : ControllerBase
{
    private readonly IMediator _mediator;

    public TicketsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("create/{bookingId}")]
    public async Task<IActionResult> CreateTicket(string bookingCode)
    {
        var command = new TicketCreateCommand { BookingCode = bookingCode };
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet("showtime/{showtimeId}")]
    public async Task<IActionResult> GetTicketByShowtime(Guid showtimeId)
    {
        var result = await _mediator.Send(new TicketGetByShowtimeQuery { ShowtimeId = showtimeId });
        return Ok(result);
    }

    [Authorize(Roles = "ADMIN,EMPLOYEE")]
    [HttpGet("code/{ticketCode}")]
    public async Task<IActionResult> GetTicketByTicketCode(string ticketCode)
    {
        var result = await _mediator.Send(new TicketGetByTicketCodeQuery { TicketCode = ticketCode });
        return Ok(result);
    }

    [Authorize(Roles = "ADMIN,EMPLOYEE")]
    [HttpPost("approve")]
    public async Task<IActionResult> ApproveTicket([FromBody] ApproveTicketCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet("this-month")]
    public async Task<IActionResult> GetTicketsThisMonth()
    {
        var result = await _mediator.Send(new TicketGetCurrentMonthQuery());
        return Ok(result);
    }

    [HttpPost("search")]
    public async Task<IActionResult> SearchTicket([FromBody] TicketSearchQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(result);
    }
}
