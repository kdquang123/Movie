using Amazon.S3.Model;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ShowtimesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ShowtimesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // [HttpGet("{id}")]
    // public IActionResult GetShowtimeById(int id)
    // {
    //     var result = _mediator.Send(new ShowtimeGetByIdQuery(id)).Result;
    //     return Ok(result);
    // }

    // [HttpGet]
    // public IActionResult GetAllShowtimes()
    // {
    //     var result = _mediator.Send(new ShowtimeGetAllQuery()).Result;
    //     return Ok(result);
    // }

    [HttpPost("add")]
    public IActionResult CreateShowtime([FromBody] ShowtimeCreateCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = _mediator.Send(command).Result;
        return Ok(result);
    }

    [HttpPost("date")]
    public async Task<IActionResult> GetShowtimeByDate([FromBody] ShowtimeGetByDateQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(result);
    }
}
