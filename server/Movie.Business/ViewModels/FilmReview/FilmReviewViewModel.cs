using System;

namespace Movie.Business.ViewModels;

public class FilmReviewViewModel
{
    public Guid Id { get; set; }
    public UserReviewViewModel? User { get; set; }
    public Guid FilmId { get; set; }
    public required string Comment { get; set; }
    public int Rating { get; set; }
}
