using System;

namespace Movie.Business.ViewModels;

public class BannerViewModel
{
    public Guid Id { get; set; }
    public required string ImageUrl { get; set; }
    public Guid? FilmId { get; set; }
    public FilmViewModel? Film { get; set; }
    public Guid? NewsId { get; set; }
    public NewsViewModel? News { get; set; }
    public required string BannerType { get; set; }
}
