using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Extensions;
using Movie.Core.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class PromotionSearchQueryHandler : BaseHandler, IRequestHandler<PromotionSearchQuery, PaginatedResult<PromotionViewModel>>
{
    public PromotionSearchQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<PromotionViewModel>> Handle(PromotionSearchQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.PromotionRepository.GetQuery();
        query = query.Where(c => c.IsDelete == false);

        if (!string.IsNullOrEmpty(request.Keyword))
        {
            query = query.Where(x => x.Name.Contains(request.Keyword));
        }

        if (!string.IsNullOrEmpty(request.DiscountType))
        {
            query = query.Where(x => x.DiscountType == request.DiscountType);
        }

        if (string.IsNullOrEmpty(request.Status))
        {
            if (request.Status == "active")
            {
                query = query.Where(x => x.StartDate <= DateTime.Now && x.EndDate >= DateTime.Now);
            }
            else if (request.Status == "scheduled")
            {
                query = query.Where(x => x.StartDate > DateTime.Now);
            }
            else if (request.Status == "expired")
            {
                query = query.Where(x => x.EndDate < DateTime.Now);
            }
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
        var viewModels = _mapper.Map<IEnumerable<PromotionViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<PromotionViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}
