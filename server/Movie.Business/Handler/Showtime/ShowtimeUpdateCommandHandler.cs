using System;
using AutoMapper;
using MediatR;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ShowtimeUpdateCommandHandler : BaseHandler, IRequestHandler<ShowtimeUpdateCommand, bool>
{
    public ShowtimeUpdateCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(ShowtimeUpdateCommand request, CancellationToken cancellationToken)
    {
        if (request.StartDate < DateTime.Now)
        {
            return false;
        }
        var movie = _unitOfWork.FilmRepository.GetById(request.MovieId);
        if (movie == null) return false;
        if (request.StartDate < movie.ReleaseDate || request.StartDate > movie.EndDate) return false;

        string[] time = request.StartTime.Split(":");
        request.StartDate = request.StartDate.AddHours(int.Parse(time[0]));
        request.StartDate = request.StartDate.AddMinutes(int.Parse(time[1]));

        var showtime = _unitOfWork.ShowTimeRepository.GetById(request.Id);
        if (showtime == null)
            throw new NotFoundException("Suất chiếu không tồn tại");

        showtime.FilmId = request.MovieId;
        showtime.RoomId = request.RoomId;
        showtime.StartTime = request.StartDate;
        showtime.EndTime = request.StartDate.AddMinutes(request.Duration);
        showtime.BasePrice = request.BasePrice;
        showtime.WeekendPrice = request.WeekendPrice;
        showtime.UpdatedAt = DateTime.Now;
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
