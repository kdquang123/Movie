using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler;
using Movie.Core.Models;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingsController : ControllerBase
{
    private readonly IMediator _mediator;

    public BookingsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateBooking([FromBody] BookingCreateCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(new { PaymentUrl = result });
    }

    [HttpGet("payment-callback")]
    [AllowAnonymous]
    public async Task<IActionResult> VNPayCallback([FromQuery] VNPayCallbackModel model)
    {
        if (model.vnp_ResponseCode == "00")
        {
            // Giao dịch thành công
            var result = await _mediator.Send(new TicketCreateCommand { BookingCode = model.vnp_TxnRef! });
            if (result == true)
            {
                return Redirect("http://localhost:4200/booking-success");
            }
        }
        return Redirect("http://localhost:4200/booking-failed");
    }

    [HttpGet("my-bookings")]
    [Authorize]
    public async Task<IActionResult> GetBookingByUserId()
    {
        var result = await _mediator.Send(new GetMyBookingQuery());
        return Ok(result);
    }

    [HttpGet]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetAllBookings()
    {
        var result = await _mediator.Send(new BookingGetAllQuery());
        return Ok(result);
    }

    [HttpGet("this-month")]
    [Authorize(Roles = "ADMIN,EMPLOYEE")]
    public async Task<IActionResult> GetBookingsThisMonth()
    {
        var result = await _mediator.Send(new BookingGetCurrentMonthQuery());
        return Ok(result);
    }
}
