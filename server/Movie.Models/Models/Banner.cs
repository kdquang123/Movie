using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Movie.Models;

public class Banner : MasterBaseEntity
{
    public required string ImageUrl { get; set; }
    [ForeignKey(nameof(Movie))]
    public Guid? MovieId { get; set; }
    public Film? Film { get; set; }
    [ForeignKey(nameof(News))]
    public Guid? NewsId { get; set; }
    public News? News { get; set; }
    public BannerType BannerType { get; set; }
}

public enum BannerType
{
    Movie,
    News
}
