using System;
using MediatR;

namespace Movie.Business.Handler;

public class SeatChangeTypeCommand:IRequest<bool>
{
    public required Guid Id { get; set; }
    public required int SeatType { get; set; } // 0: Normal, 1: Vip, 2: Disabled
}
