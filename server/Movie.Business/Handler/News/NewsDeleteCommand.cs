using System;
using MediatR;

namespace Movie.Business.Handler;

public class NewsDeleteCommand : IRequest<bool>
{
    public required Guid Id { get; set; }
}
