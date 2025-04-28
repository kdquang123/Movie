using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models;

public class FilmReview : BaseEntity
{
    [ForeignKey(nameof(User))]
    public Guid UserId { get; set; }
    public required User User { get; set; }
    [ForeignKey(nameof(Movie))]
    public int MovieId { get; set; }
    public required Film Film { get; set; }
    public required string Comment { get; set; }
    public int Rating { get; set; }
}
