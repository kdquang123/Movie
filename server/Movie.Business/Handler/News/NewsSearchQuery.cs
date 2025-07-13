using System;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class NewsSearchQuery : BaseSearchQuery<NewsViewModel>
{
    public string Category { get; set; } = "";
}
