using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class ProductGetAllQuery : IRequest<IEnumerable<ProductViewModel>>
{

}
