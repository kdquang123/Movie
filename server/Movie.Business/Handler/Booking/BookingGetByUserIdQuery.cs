using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class BookingGetByUserIdQuery : IRequest<IEnumerable<BookingViewModel>>
{
    public required Guid UserId { get; set; }
}
