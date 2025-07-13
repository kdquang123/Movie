using System;
using MediatR;

namespace Movie.Business.Handler;

public class ProductDeleteCommand : IRequest<bool>
{
    public required Guid Id { get; set; }
}
