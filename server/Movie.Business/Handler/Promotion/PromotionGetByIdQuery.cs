using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class PromotionGetByIdQuery : IRequest<PromotionViewModel>
{
    public required Guid Id { get; set; }
}
