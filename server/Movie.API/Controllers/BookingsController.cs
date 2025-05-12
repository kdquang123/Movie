using MediatR;
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
    public async Task<IActionResult> CreateBooking([FromBody] BookingCreateCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(new { PaymentUrl = result });
    }

    [HttpGet("payment-callback")]
    public async Task<IActionResult> VNPayCallback([FromQuery] VNPayCallbackModel model)
    {
        // Bước 1: Xác minh chữ ký hash
        // bool isValid = _vnpayService.VerifySignature(model);
        // if (!isValid)
        //     return BadRequest("Invalid signature");

        // Bước 2: Kiểm tra trạng thái giao dịch
        if (model.vnp_ResponseCode == "00")
        {
            // Giao dịch thành công
            var result = await _mediator.Send(new TicketCreateCommand { BookingCode = model.vnp_TxnRef });
            if (result == true)
            {
                return Redirect("http://localhost:4200/booking-success");
            }
        }
        return Redirect("http://localhost:4200/booking-failed");
    }
}
