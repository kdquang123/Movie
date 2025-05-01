using System;
using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Movie.Business.Handler;

public class FilmDeleteCommand : IRequest<bool>
{
    [Required(ErrorMessage = "Movie Id is required")]
    public required Guid Id { get; set; }
}
