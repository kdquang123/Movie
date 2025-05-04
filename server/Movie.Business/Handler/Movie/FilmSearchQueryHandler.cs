using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Extensions;
using Movie.Core.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class FilmSearchQueryHandler : BaseHandler, IRequestHandler<FilmSearchQuery, PaginatedResult<FilmViewModel>>
{
    public FilmSearchQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<FilmViewModel>> Handle(FilmSearchQuery request, CancellationToken cancellationToken)
    {
        // Tao query
        var query = _unitOfWork.FilmRepository.GetQuery();

        query = query.Where(c => c.IsDelete == false);

        // Check keyword not null or empty, then filter
        if (!string.IsNullOrEmpty(request.Keyword))
        {
            query = query.Where(x => x.Name.Contains(request.Keyword) || x.Director.Contains(request.Keyword) || x.Actors!.Contains(request.Keyword));
        }

        if (!string.IsNullOrEmpty(request.Status))
        {
            if (request.Status == "ComingSoon")
            {
                query = query.Where(x => x.ReleaseDate > DateTime.UtcNow);
            }
            else if (request.Status == "NowShowing")
            {
                query = query.Where(x => x.ReleaseDate <= DateTime.UtcNow && x.EndDate >= DateTime.UtcNow);
            }
            else if (request.Status == "Ended")
            {
                query = query.Where(x => x.EndDate < DateTime.UtcNow);
            }
        }

        query = query.Include(f => f.FilmCategories).ThenInclude(fc => fc.Category);

        if (!string.IsNullOrEmpty(request.CategoryId))
        {
            query = query.Where(x => x.FilmCategories.Any(fc => fc.CategoryId == Guid.Parse(request.CategoryId)));
        }

        // Dem so luong
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
            .Take(request.PageSize).Include(f => f.AgeRestriction)
            .ToListAsync(cancellationToken);

        // Chuyen du lieu sang view model
        var viewModels = _mapper.Map<IEnumerable<FilmViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<FilmViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}
