using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ShowtimeGetByDateQueryHandler : BaseHandler, IRequestHandler<ShowtimeGetByDateQuery, IEnumerable<ShowtimeViewModel>>
{
    public ShowtimeGetByDateQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<ShowtimeViewModel>> Handle(ShowtimeGetByDateQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.ShowTimeRepository.GetQuery();
        var showtimeList = await query.Where(st => st.StartTime.Date == request.StartDate.Date && st.IsDelete == false).Include(st => st.Room).ThenInclude(r => r.RoomType).ToListAsync();
        return _mapper.Map<IEnumerable<ShowtimeViewModel>>(showtimeList);
    }
}
