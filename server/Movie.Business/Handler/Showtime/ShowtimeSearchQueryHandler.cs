using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Extensions;
using Movie.Core.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ShowtimeSearchQueryHandler : BaseHandler, IRequestHandler<ShowtimeSearchQuery, PaginatedResult<ShowtimeViewModel>>
{
    public ShowtimeSearchQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<ShowtimeViewModel>> Handle(ShowtimeSearchQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.ShowTimeRepository.GetQuery();
        query = query.Where(c => c.IsDelete == false);

        if (!string.IsNullOrEmpty(request.Keyword))
        {

        }

        if(!string.IsNullOrEmpty(request.StartDate))
        {
            query = query.Where(c => c.StartTime.Date == DateTime.Parse(request.StartDate).Date);
        }

        if (!string.IsNullOrEmpty(request.RoomId))
        {
            query = query.Where(c => c.RoomId == Guid.Parse(request.RoomId));
        }

        if (!string.IsNullOrEmpty(request.MovieId))
        {
            query = query.Where(c => c.FilmId == Guid.Parse(request.MovieId));
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
            .Take(request.PageSize).Include(st => st.Room).Include(st => st.Film)
            .ToListAsync(cancellationToken);

        // Chuyen du lieu sang view model
        var viewModels = _mapper.Map<IEnumerable<ShowtimeViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<ShowtimeViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}
