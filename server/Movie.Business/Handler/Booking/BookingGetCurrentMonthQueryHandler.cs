using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class BookingGetCurrentMonthQueryHandler : BaseHandler, IRequestHandler<BookingGetCurrentMonthQuery, IEnumerable<BookingViewModel>>
{
    public BookingGetCurrentMonthQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<BookingViewModel>> Handle(BookingGetCurrentMonthQuery request, CancellationToken cancellationToken)
    {
        var currentMonth = DateTime.Now.Month;
        var bookings = await _unitOfWork.BookingRepository.GetQuery()
            .Where(b => b.IsDelete == false && b.CreatedAt.HasValue &&
                    b.CreatedAt.Value.Month == currentMonth)
            .ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<BookingViewModel>>(bookings);
    }
}
