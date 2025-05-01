using System;
using System.ComponentModel.DataAnnotations.Schema;
using Movie.Models.Models;

namespace Movie.Models;

public class Film : MasterBaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Director { get; set; }
    public string? Actors { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public DateTime EndDate { get; set; }
    public required string ImageUrl { get; set; }
    public string? TrailerUrl { get; set; }
    public int IMDbScore { get; set; }

    [ForeignKey(nameof(AgeRestriction))]
    public Guid AgeRestrictionId { get; set; }
    public AgeRestriction? AgeRestriction { get; set; }
    public ICollection<FilmReview>? FilmReviews { get; set; }
    public ICollection<FilmCategory>? FilmCategories { get; set; }
    public ICollection<Category>? Categories { get; set; }
}
