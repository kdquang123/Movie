using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class BookingGetAllQueryHandler : BaseHandler, IRequestHandler<BookingGetAllQuery, IEnumerable<BookingViewModel>>
{
    public BookingGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<BookingViewModel>> Handle(BookingGetAllQuery request, CancellationToken cancellationToken)
    {
        var bookings = await _unitOfWork.BookingRepository.GetQuery()
            .Where(b => b.IsDelete == false)
            .ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<BookingViewModel>>(bookings);
    }
}
