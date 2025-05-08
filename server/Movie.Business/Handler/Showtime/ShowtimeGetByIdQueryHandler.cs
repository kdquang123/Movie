using System;
using AutoMapper;
using MediatR;
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
        var showtime = _unitOfWork.ShowTimeRepository.GetById(request.Id);
        return _mapper.Map<ShowtimeViewModel>(showtime);
    }
}
