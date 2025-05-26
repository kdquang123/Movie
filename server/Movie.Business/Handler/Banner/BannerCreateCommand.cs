using System;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Movie.Business.Handler;

public class BannerCreateCommand : IRequest<bool>
{
    public required IFormFile Image { get; set; }
    public Guid? MovieId { get; set; }
    public Guid? NewsId { get; set; }

    public required string BannerType { get; set; }
}
