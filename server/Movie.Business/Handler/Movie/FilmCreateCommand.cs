using System;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Movie.Business.Handler.Movie;

public class FilmCreateCommand : IRequest<bool>
{
    [Required]
    [StringLength(100, MinimumLength = 1, ErrorMessage = "Name must be between 1 and 100 characters.")]
    public required string Name { get; set; }

    [Required]
    [StringLength(500, MinimumLength = 1, ErrorMessage = "Description must be between 1 and 500 characters.")]
    public required string Description { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 1, ErrorMessage = "Director must be between 1 and 100 characters.")]
    public required string Director { get; set; }

    [StringLength(200, ErrorMessage = "Actors list must not exceed 200 characters.")]
    public string? Actors { get; set; }

    [Range(1, 600, ErrorMessage = "Duration must be between 1 and 600 minutes.")]
    public int Duration { get; set; }

    [Required]
    [DataType(DataType.Date, ErrorMessage = "Invalid Release Date format.")]
    public DateTime ReleaseDate { get; set; }

    [Required]
    [DataType(DataType.Date, ErrorMessage = "Invalid End Date format.")]
    public DateTime EndDate { get; set; }

    [Required(ErrorMessage = "Poster is required.")]
    public required IFormFile Poster { get; set; }

    [Url(ErrorMessage = "Invalid Trailer URL format.")]
    public string? TrailerUrl { get; set; }

    [Range(0, 10, ErrorMessage = "IMDb Score must be between 0 and 10.")]
    public int IMDbScore { get; set; }

    [Required(ErrorMessage = "CategoryId is required.")]
    public List<Guid> Categories { get; set; } = [];

    [Required(ErrorMessage = "AgeRestrictionId is required.")]
    public Guid AgeRestrictionId { get; set; }
}
