using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class FilmSearchQuery : BaseSearchQuery<FilmViewModel>
{
    public string CategoryId { get; set; } = "";
    public string Status { get; set; } = "";
}
