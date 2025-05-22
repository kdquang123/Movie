using System;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Movie.Business.Handler;

public class NewsCreateCommand : IRequest<bool>
{
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required IFormFile Image { get; set; }
    public required string Category { get; set; }
}
