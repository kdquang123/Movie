using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class FilmGetByIdQuery : IRequest<FilmViewModel>
{
    public Guid Id { get; set; }
}
