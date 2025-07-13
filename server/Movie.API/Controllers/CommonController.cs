using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler;
using Movie.Models;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "ADMIN,EMPLOYEE")]
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

    [HttpGet("movie-statuses")]
    public async Task<IActionResult> GetFilmStatuses()
    {
        var statuses = Enum.GetValues(typeof(FilmStatus))
                          .Cast<FilmStatus>()
                          .Select(s => new { Id = (int)s, Name = s.ToString() })
                          .ToList();
        return Ok(statuses);
    }

    [HttpGet("room-types")]
    public async Task<IActionResult> GetRoomTypes()
    {
        var result = await _mediator.Send(new RoomTypeGetAllQuery());
        return Ok(result);
    }
}
