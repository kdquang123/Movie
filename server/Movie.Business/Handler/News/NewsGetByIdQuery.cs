using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class NewsGetByIdQuery : IRequest<NewsViewModel>
{
    public required Guid Id { get; set; }
}
