using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class ProductGetByIdQuery : IRequest<ProductViewModel>
{
    public required Guid Id { get; set; }
}
