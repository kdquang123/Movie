using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class ShowtimeGetByIdQuery : IRequest<ShowtimeViewModel>
{
    public Guid Id { get; set; }
}

