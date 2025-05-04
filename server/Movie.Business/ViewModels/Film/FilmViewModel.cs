using System;
using Movie.Models;

namespace Movie.Business.ViewModels;

public class FilmViewModel
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Director { get; set; }
    public string? Actors { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public DateTime EndDate { get; set; }
    private string? _status;
    public string? Status
    {
        get
        {
            var currentDate = DateTime.UtcNow;
            if (currentDate < ReleaseDate)
                return FilmStatus.ComingSoon.ToString();
            if (currentDate >= ReleaseDate && currentDate <= EndDate)
                return FilmStatus.NowPlaying.ToString();
            return FilmStatus.Ended.ToString();
        }
        set => _status = value;
    }
    public required string ImageUrl { get; set; }
    public string? TrailerUrl { get; set; }
    public decimal IMDbScore { get; set; }
    public Guid AgeRestrictionId { get; set; }
    public AgeRestrictionViewModel? AgeRestriction { get; set; }
    public ICollection<CategoryViewModel>? Categories { get; set; }
}
