using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class BannerGetByIdQuery : IRequest<BannerViewModel>
{
    public required Guid Id { get; set; }
}
