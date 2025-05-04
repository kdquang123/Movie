using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class FilmCommingSoonGetQuery : IRequest<IEnumerable<FilmViewModel>>
{

}

