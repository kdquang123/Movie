using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FilmReviewsController : ControllerBase
{
    private readonly IMediator _mediator;

    public FilmReviewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateReview([FromBody] FilmReviewCreateCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet("movie/{id}")]
    public async Task<IActionResult> GetReviews(Guid id)
    {
        var result = await _mediator.Send(new FilmReviewGetByMovieIdQuery { MovieId = id });
        return Ok(result);
    }
}
