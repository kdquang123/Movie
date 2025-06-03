using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ShowtimeGetByMovieIdQueryHandler : BaseHandler, IRequestHandler<ShowtimeGetByMovieIdQuery, IEnumerable<ShowtimeViewModel>>
{
    public ShowtimeGetByMovieIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<ShowtimeViewModel>> Handle(ShowtimeGetByMovieIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.ShowTimeRepository.GetQuery();
        var showtimeList = await query.Where(st => st.FilmId == request.MovieId && st.IsDelete == false && st.StartTime >= DateTime.Now).Include(x => x.Room).ThenInclude(r => r!.RoomType).OrderBy(st => st.StartTime).ToListAsync();
        return _mapper.Map<IEnumerable<ShowtimeViewModel>>(showtimeList);
    }
}
