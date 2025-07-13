using System;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class PromotionSearchQuery : BaseSearchQuery<PromotionViewModel>
{
    public string DiscountType { get; set; } = "";
    public string Status { get; set; } = "";
}
