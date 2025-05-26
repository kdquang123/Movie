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

public class BannerSearchQueryHandler : BaseHandler, IRequestHandler<BannerSearchQuery, PaginatedResult<BannerViewModel>>
{
    public BannerSearchQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<BannerViewModel>> Handle(BannerSearchQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.BannerRepository.GetQuery();
        query = query.Where(c => c.IsDelete == false);

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
        var viewModels = _mapper.Map<IEnumerable<BannerViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<BannerViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}
