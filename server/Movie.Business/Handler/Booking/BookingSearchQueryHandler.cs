using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Extensions;
using Movie.Core.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class BookingSearchQueryHandler : BaseHandler, IRequestHandler<BookingSearchQuery, PaginatedResult<BookingViewModel>>
{
    public BookingSearchQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedResult<BookingViewModel>> Handle(BookingSearchQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.BookingRepository.GetQuery();
        query = _unitOfWork.BookingRepository.GetQuery()
         .Include(b => b.Showtime).ThenInclude(st => st!.Film)
         .Include(b => b.Tickets).ThenInclude(t => t.Seat)
         .Include(b=>b.User)
         .AsSplitQuery();

        if (!string.IsNullOrEmpty(request.Keyword))
        {
            query = query.Where(x => x.User!.FullName!.Contains(request.Keyword));
        }

        if (!string.IsNullOrEmpty(request.Status))
        {
            query = query.Where(x => x.BookingStatus.ToString() == request.Status);
        }


        int total = await query.CountAsync(cancellationToken);

        // Sap xep
        if (!string.IsNullOrEmpty(request.OrderBy))
        {
            query = query.OrderByExtension(request.OrderBy, request.OrderDirection.ToString());
        }
        else
        {
            query = query.OrderByDescending(x => x.CreatedAt);
        }

        // Lay du lieu
        var items = await query.Skip(request.PageSize * (request.PageNumber - 1))
            .Take(request.PageSize).Include(x => x.Showtime).ThenInclude(b => b!.Film)
            .ToListAsync(cancellationToken);

        // Chuyen du lieu sang view model
        var viewModels = _mapper.Map<IEnumerable<BookingViewModel>>(items);

        // Tra ve ket qua
        return new PaginatedResult<BookingViewModel>(request.PageNumber, request.PageSize, total, viewModels);
    }
}

