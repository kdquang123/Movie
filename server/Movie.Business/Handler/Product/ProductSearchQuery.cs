using System;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class ProductSearchQuery : BaseSearchQuery<ProductViewModel>
{
    public string? Status { get; set; }
}
