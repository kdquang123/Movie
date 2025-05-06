using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoomsController : ControllerBase
{
    private readonly IMediator _mediator;

    public RoomsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllRooms()
    {
        var result = await _mediator.Send(new RoomGetAllQuery());
        return Ok(result);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetRoomById(Guid id)
    {
        var result = await _mediator.Send(new RoomGetByIdQuery { Id = id });
        return Ok(result);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateRoom(Guid id, [FromBody] RoomUpdateCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        command.Id = id;
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoom(Guid id)
    {
        var result = await _mediator.Send(new RoomDeleteCommand { Id = id });
        return Ok(result);
    }

    [HttpPost("search")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> SearchRooms([FromBody] RoomSearchQuery query)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddRoom([FromBody] RoomCreateCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _mediator.Send(command);
        return Ok(result);
    }
}
