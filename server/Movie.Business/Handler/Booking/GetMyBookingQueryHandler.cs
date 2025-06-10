using System;
using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class GetMyBookingQueryHandler : BaseHandler, IRequestHandler<GetMyBookingQuery, IEnumerable<BookingViewModel>>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    public GetMyBookingQueryHandler(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<IEnumerable<BookingViewModel>> Handle(GetMyBookingQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "";
        var query = _unitOfWork.BookingRepository.GetQuery().Where(b => b.UserId == Guid.Parse(userId))
         .Include(b => b.Showtime).ThenInclude(st => st!.Film)
         .Include(b => b.Tickets).ThenInclude(t => t.Seat)
         .Include(b => b.BookingDetails).ThenInclude(bd => bd.Product)
         .AsSplitQuery();
        var bookings = await query.ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<BookingViewModel>>(bookings);
    }
}
