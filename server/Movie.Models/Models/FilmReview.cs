using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models;

public class FilmReview : BaseEntity
{
    [ForeignKey(nameof(User))]
    public Guid UserId { get; set; }
    public User? User { get; set; }
    [ForeignKey(nameof(Film))]
    public Guid FilmId { get; set; }
    public Film? Film { get; set; }
    public required string Comment { get; set; }
    public int Rating { get; set; }
}
