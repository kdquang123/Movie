using MediatR;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CommonController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpGet("categories")]
    public async Task<IActionResult> GetFilmCategories()
    {
        var result = await _mediator.Send(new CategoryGetAllQuery());
        return Ok(result);
    }

    [HttpGet("age-restrictions")]
    public async Task<IActionResult> GetFilmAgeRestrictions()
    {
        var result = await _mediator.Send(new AgeRestrictionGetAllQuery());
        return Ok(result); 
    }

}
