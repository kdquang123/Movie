using System;
using MediatR;
using Microsoft.AspNetCore.Http;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class NewsUpdateCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public IFormFile? Image { get; set; }
    public required string Category { get; set; }
}
