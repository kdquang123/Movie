using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class NewsGetAllQuery : IRequest<IEnumerable<NewsViewModel>>
{

}
