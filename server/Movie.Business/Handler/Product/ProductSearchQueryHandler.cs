using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Extensions;
using Movie.Core.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ProductSearchQueryHandler : BaseHandler, IRequestHandler<ProductSearchQuery, PaginatedResult<ProductViewModel>>
{
    public ProductSearchQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<ProductViewModel>> Handle(ProductSearchQuery request, CancellationToken cancellationToken)
    {
        // Tao query
        var query = _unitOfWork.ProductRepository.GetQuery();

        query = query.Where(c => c.IsDelete == false);

        // Check keyword not null or empty, then filter
        if (!string.IsNullOrEmpty(request.Keyword))
        {
            query = query.Where(x => x.Name.Contains(request.Keyword));
        }

        if (!string.IsNullOrEmpty(request.Status))
        {
            if (request.Status == "in-stock")
            {
                query = query.Where(x => x.Quantity > 0 && x.IsActive == true);
            }
            else if (request.Status == "out-of-stock")
            {
                query = query.Where(x => x.Quantity == 0 && x.IsActive == true);
            }
            else if (request.Status == "discontinued")
            {
                query = query.Where(x => x.IsActive == false);
            }
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
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        // Chuyen du lieu sang view model
        var viewModels = _mapper.Map<IEnumerable<ProductViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<ProductViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}
