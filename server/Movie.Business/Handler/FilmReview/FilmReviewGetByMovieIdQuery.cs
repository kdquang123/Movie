using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class FilmReviewGetByMovieIdQuery : IRequest<IEnumerable<FilmReviewViewModel>>
{
    public required Guid MovieId { get; set; }
}
