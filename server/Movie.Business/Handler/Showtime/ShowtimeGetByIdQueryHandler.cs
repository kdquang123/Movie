using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ShowtimeGetByIdQueryHandler : BaseHandler, IRequestHandler<ShowtimeGetByIdQuery, ShowtimeViewModel>
{
    public ShowtimeGetByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<ShowtimeViewModel> Handle(ShowtimeGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.ShowTimeRepository.GetQuery();
        var showtime = await query.Where(st => st.Id == request.Id).Include(st => st.Room).ThenInclude(r => r.Seats).Include(st => st.Room)
        .ThenInclude(r => r.RoomType).Include(st => st.Film).FirstOrDefaultAsync(cancellationToken);
        return _mapper.Map<ShowtimeViewModel>(showtime);
    }
}
