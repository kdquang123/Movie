using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Extensions;
using Movie.Core.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class TicketSearchQueryHandler : BaseHandler, IRequestHandler<TicketSearchQuery, PaginatedResult<TicketDetailViewModel>>
{
    public TicketSearchQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<TicketDetailViewModel>> Handle(TicketSearchQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.TicketRepository.GetQuery();
        query = query.Where(t => t.IsDelete == false).Include(t => t.Booking).ThenInclude(b => b!.User);

        if (!string.IsNullOrEmpty(request.Keyword))
        {
            query = query.Where(x => x.Booking!.User!.FullName!.Contains(request.Keyword));
        }

        if (!string.IsNullOrEmpty(request.Status))
        {
            query = query.Where(x => x.Booking!.BookingStatus.ToString() == request.Status);
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
            .Take(request.PageSize).Include(x => x.Booking).ThenInclude(b => b!.Showtime).ThenInclude(st => st!.Film)
            .ToListAsync(cancellationToken);

        // Chuyen du lieu sang view model
        var viewModels = _mapper.Map<IEnumerable<TicketDetailViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<TicketDetailViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}
