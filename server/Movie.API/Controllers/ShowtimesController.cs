using System.Threading.Tasks;
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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetShowtimeById(Guid id)
    {
        var result = await _mediator.Send(new ShowtimeGetByIdQuery { Id = id });
        return Ok(result);
    }

    // [HttpGet]
    // public IActionResult GetAllShowtimes()
    // {
    //     var result = _mediator.Send(new ShowtimeGetAllQuery()).Result;
    //     return Ok(result);
    // }

    [HttpPost("search")]
    public async Task<IActionResult> SearchShowtimes([FromBody] ShowtimeSearchQuery query)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _mediator.Send(query);
        return Ok(result);
    }

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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShowtime(Guid id)
    {
        var result = await _mediator.Send(new ShowtimeDeleteCommand { Id = id });
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateShowtime(Guid id, [FromBody] ShowtimeUpdateCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        command.Id = id;
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet("movie/{id}")]
    public async Task<IActionResult> GetShowtimeByMovieId(Guid id)
    {
        var result = await _mediator.Send(new ShowtimeGetByMovieIdQuery { MovieId = id });
        return Ok(result);
    }
}
