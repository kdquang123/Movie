using System;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class RoomCreateCommandHandler : BaseHandler, IRequestHandler<RoomCreateCommand, bool>
{
    public RoomCreateCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(RoomCreateCommand request, CancellationToken cancellationToken)
    {
        var newRoom = new Room
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            TotalRows = request.TotalRows,
            TotalColumns = request.TotalColumns,
            RoomTypeId = request.RoomTypeId,
            SeatQuantity = request.TotalRows * request.TotalColumns,
            CreatedAt = DateTime.Now
        };

        newRoom.Seats = new List<Seat>();
        for (int i = 0; i < request.TotalRows; i++)
        {
            for (int j = 0; j < request.TotalColumns; j++)
            {
                string rowLetter = ((char)('A' + i)).ToString();
                string seatName = $"{rowLetter}{j + 1}";
                newRoom.Seats.Add(new Seat
                {
                    SeatName = seatName,
                    Row = i + 1,
                    Column = j + 1,
                    RoomId = newRoom.Id,
                    Type = SeatType.Normal,
                });
            }
        }

        _unitOfWork.RoomRepository.Add(newRoom);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
