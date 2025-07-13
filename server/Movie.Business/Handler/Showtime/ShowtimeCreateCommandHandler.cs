using System;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class ShowtimeCreateCommandHandler : BaseHandler, IRequestHandler<ShowtimeCreateCommand, bool>
{
    public ShowtimeCreateCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(ShowtimeCreateCommand request, CancellationToken cancellationToken)
    {
        var date1= DateTime.Now;
        
        var movie = _unitOfWork.FilmRepository.GetById(request.MovieId);
        if (movie == null) return false;
        if (request.StartDate < movie.ReleaseDate || request.StartDate > movie.EndDate)
        {
            throw new InvalidOperationException("Thời gian chiếu không hợp lệ");
        }

        string[] time = request.StartTime.Split(":");
        request.StartDate = request.StartDate.AddHours(int.Parse(time[0]));
        request.StartDate = request.StartDate.AddMinutes(int.Parse(time[1]));

        if (request.StartDate < DateTime.Now)
        {
            throw new InvalidOperationException("Thời gian chiếu không hợp lệ");
        }

        var showtime = new Showtime
        {
            Id = Guid.NewGuid(),
            FilmId = request.MovieId,
            RoomId = request.RoomId,
            StartTime = request.StartDate,
            EndTime = request.StartDate.AddMinutes(request.Duration),
            BasePrice = request.BasePrice,
            WeekendPrice = request.WeekendPrice,
            CreatedAt = DateTime.Now
        };

        _unitOfWork.ShowTimeRepository.Add(showtime);
        var result = await _unitOfWork.SaveChangesAsync();
        return result > 0;
    }
}