using System;
using AutoMapper;
using MediatR;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ShowtimeDeleteCommandHandler : BaseHandler, IRequestHandler<ShowtimeDeleteCommand, bool>
{
    public ShowtimeDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(ShowtimeDeleteCommand request, CancellationToken cancellationToken)
    {
        var showtime = _unitOfWork.ShowTimeRepository.GetById(request.Id);
        if (showtime == null)
            throw new NotFoundException("Suất chiếu không tồn tại");

        showtime.IsDelete = true;
        showtime.DeletedAt = DateTime.Now;
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
