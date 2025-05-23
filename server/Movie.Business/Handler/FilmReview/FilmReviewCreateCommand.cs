using System;
using MediatR;

namespace Movie.Business.Handler;

public class FilmReviewCreateCommand : IRequest<bool>
{
    public Guid UserId { get; set; }
    public Guid FilmId { get; set; }
    public required string Review { get; set; }
    public required int Rating { get; set; }
}
