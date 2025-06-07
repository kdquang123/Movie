using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.Business.Handler;

namespace Movie.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PromotionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PromotionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new PromotionGetAllQuery());
        return Ok(result);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new PromotionGetByIdQuery { Id = id });
        return Ok(result);
    }

    [HttpPost("add")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Create([FromBody] PromotionCreateCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Update(Guid id, [FromBody] PromotionUpdateCommand command)
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
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _mediator.Send(new PromotionDeleteCommand { Id = id });
        return Ok(result);
    }

    [HttpPost("search")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Search([FromBody] PromotionSearchQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpPost("get-by-code/{code}")]
    public async Task<IActionResult> GetByCode(string code, [FromBody] PromotionGetByCodeQuery query)
    {
        query.Code = code;
        if (string.IsNullOrEmpty(query.Code) || query.OrderAmount <= 0)
        {
            return BadRequest(new { message = "Đơn hàng không hợp lệ hoặc không đủ điều kiện để áp dụng khuyến mãi.", status = 400 });
        }
        var result = await _mediator.Send(query);
        return Ok(result);
    }
}
