using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class BookingGetByUserIdQueryHandler : BaseHandler, IRequestHandler<BookingGetByUserIdQuery, IEnumerable<BookingViewModel>>
{
    public BookingGetByUserIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<BookingViewModel>> Handle(BookingGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.BookingRepository.GetQuery().Where(b => b.UserId == request.UserId)
        .Include(b => b.Showtime).ThenInclude(st => st!.Film)
        .Include(b => b.Showtime).ThenInclude(st => st!.Room)
        .Include(b => b.Tickets).ThenInclude(t => t.Seat)
        .Include(b => b.BookingDetails).ThenInclude(bd => bd.Product)
        .AsSplitQuery();
        var bookings = await query.ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<BookingViewModel>>(bookings);
    }
}
