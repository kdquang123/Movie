using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class ShowtimeGetByDateQuery : IRequest<IEnumerable<ShowtimeViewModel>>
{
    public DateTime StartDate { get; set; }
}
