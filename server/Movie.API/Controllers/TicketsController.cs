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
    public IActionResult CreateTicket(string bookingCode)
    {
        var command = new TicketCreateCommand { BookingCode = bookingCode };
        var result = _mediator.Send(command).Result;
        return Ok(result);
    }
}
