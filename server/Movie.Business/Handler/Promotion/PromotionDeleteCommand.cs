using System;
using MediatR;

namespace Movie.Business.Handler;

public class PromotionDeleteCommand : IRequest<bool>
{
    public required Guid Id { get; set; }
}
