using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Extensions;
using Movie.Core.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class RoomSearchQueryHandler : BaseHandler, IRequestHandler<RoomSearchQuery, PaginatedResult<RoomViewModel>>
{
    public RoomSearchQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<RoomViewModel>> Handle(RoomSearchQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.RoomRepository.GetQuery();
        query = query.Where(c => c.IsDelete == false);

        if (!string.IsNullOrEmpty(request.Keyword))
        {
            query = query.Where(x => x.Name.Contains(request.Keyword));
        }

        if (!string.IsNullOrEmpty(request.RoomTypeId))
        {
            query = query.Where(x => x.RoomTypeId == Guid.Parse(request.RoomTypeId));
        }

        if (request.Status != null)
        {
            if (request.Status == 0)
            {
                query = query.Where(x => x.IsActive == false);
            }
            else if (request.Status == 1)
            {
                query = query.Where(x => x.IsActive == true);
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
            .Take(request.PageSize).Include(r => r.RoomType)
            .ToListAsync(cancellationToken);

        // Chuyen du lieu sang view model
        var viewModels = _mapper.Map<IEnumerable<RoomViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<RoomViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}
