using System;
using Amazon.Runtime.Internal;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class PromotionGetByCodeQuery : IRequest<PromotionViewModel>
{
    public string? Code { get; set; }
    public decimal? OrderAmount { get; set; }
}
