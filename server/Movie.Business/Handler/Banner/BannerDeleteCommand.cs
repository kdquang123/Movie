using System;
using MediatR;

namespace Movie.Business.Handler;

public class BannerDeleteCommand : IRequest<bool>
{
    public required Guid Id { get; set; }
}
