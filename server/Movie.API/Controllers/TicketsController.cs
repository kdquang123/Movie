using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
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

    [HttpGet("code/{ticketCode}")]
    public async Task<IActionResult> GetTicketByTicketCode(string ticketCode)
    {
        var result = await _mediator.Send(new TicketGetByTicketCodeQuery { TicketCode = ticketCode });
        return Ok(result);
    }

    [HttpPost("approve")]
    public async Task<IActionResult> ApproveTicket([FromBody] ApproveTicketCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

}
