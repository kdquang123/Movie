using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Extensions;
using Movie.Core.ViewModels;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class NewsSearchQueryHandler : BaseHandler, IRequestHandler<NewsSearchQuery, PaginatedResult<NewsViewModel>>
{
    public NewsSearchQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<NewsViewModel>> Handle(NewsSearchQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.NewsRepository.GetQuery();
        query = query.Where(c => c.IsDelete == false);

        if (!string.IsNullOrEmpty(request.Keyword))
        {
            query = query.Where(x => x.Title.Contains(request.Keyword));
        }

        if (!string.IsNullOrEmpty(request.Category))
        {
            query = query.Where(x => x.Category == (request.Category == "News" ? NewsCategory.News : (request.Category == "Event" ? NewsCategory.Event : NewsCategory.Promotion)));
        }

        int total = await query.CountAsync(cancellationToken);

        // Sap xep
        if (!string.IsNullOrEmpty(request.OrderBy))
        {
            query = query.OrderByExtension(request.OrderBy, request.OrderDirection.ToString());
        }
        else
        {
            query = query.OrderBy(x => x.CreatedAt);
        }

        // Lay du lieu
        var items = await query.Skip(request.PageSize * (request.PageNumber - 1))
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        // Chuyen du lieu sang view model
        var viewModels = _mapper.Map<IEnumerable<NewsViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<NewsViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}
