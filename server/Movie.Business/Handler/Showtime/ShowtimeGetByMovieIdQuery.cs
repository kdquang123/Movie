using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class ShowtimeGetByMovieIdQuery : IRequest<IEnumerable<ShowtimeViewModel>>
{
    public Guid MovieId { get; set; }
}
