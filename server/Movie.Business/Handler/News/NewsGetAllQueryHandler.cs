using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class NewsGetAllQueryHandler : BaseHandler, IRequestHandler<NewsGetAllQuery, IEnumerable<NewsViewModel>>
{
    public NewsGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<NewsViewModel>> Handle(NewsGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.NewsRepository.GetQuery();
        var rooms = await query.Where(r => r.IsDelete == false).ToListAsync(cancellationToken: cancellationToken);
        return _mapper.Map<IEnumerable<NewsViewModel>>(rooms);
    }
}
