using System;
using MediatR;
using Microsoft.AspNetCore.Http;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class BannerUpdateCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public IFormFile? Image { get; set; }
    public Guid? MovieId { get; set; }
    public Guid? NewsId { get; set; }
}
