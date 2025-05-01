using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler.Movie;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MoviesController : ControllerBase
{
    private readonly IMediator _mediator;

    public MoviesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // public async Task<IActionResult> GetAll()
    // {
    //     return Ok();
    // }

    // public async Task<IActionResult> GetById(Guid id)
    // {
    //     return Ok();
    // }

    // public async Task<IActionResult> Update(Guid id)
    // {
    //     return Ok();
    // }

    // public async Task<IActionResult> Delete(Guid id)
    // {
    //     return Ok();
    // }

    // public async Task<IActionResult> Search(Guid id)
    // {
    //     return Ok();
    // }

    [HttpPost("add")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Search([FromForm] FilmCreateCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _mediator.Send(command);
        return Ok(result);
    }

}
