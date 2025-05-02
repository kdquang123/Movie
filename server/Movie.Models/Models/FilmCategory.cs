using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models.Models;

public class FilmCategory
{
    [ForeignKey(nameof(Film))]
    public Guid FilmId { get; set; }
    
    [ForeignKey(nameof(Category))]
    public Guid CategoryId { get; set; }

    public Category? Category { get; set; }
    public Film? Film { get; set; }
}
