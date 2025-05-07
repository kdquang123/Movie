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
        // var query = _unitOfWork.ShowTimeRepository.GetQuery();
        // var listShowTime = query.Where(x => x.FilmId == request.MovieId && x.RoomId == request.RoomId && x.DateTime.Date == request.Showtime.Date).ToList();
        // if (listShowTime.Count > 0)
        // {
        //     foreach (var item in listShowTime)
        //     {
        //         if ((request.Showtime >= item.StartTime && request.Showtime <= item.EndTime) || (request.Showtime.AddMinutes(request.MovieDuration) >= item.StartTime && request.Showtime.AddMinutes(request.MovieDuration) <= item.EndTime))
        //         {
        //             return false;
        //         }
        //     }
        // }

        var showtime = new Showtime
        {
            Id = Guid.NewGuid(),
            FilmId = request.MovieId,
            RoomId = request.RoomId,
            StartTime = request.StartTime,
            EndTime = request.StartTime.AddMinutes(request.Duration),
            BasePrice = request.BasePrice,
            WeekendPrice = request.WeekendPrice,
            CreatedAt = DateTime.UtcNow
        };

        _unitOfWork.ShowTimeRepository.Add(showtime);
        var result = await _unitOfWork.SaveChangesAsync();
        return result > 0;
    }
}