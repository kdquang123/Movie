using System;
using AutoMapper;
using MediatR;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class FimlDeleteCommandHandler : BaseHandler, IRequestHandler<FilmDeleteCommand, bool>
{
    public FimlDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(FilmDeleteCommand request, CancellationToken cancellationToken)
    {
        var film = await _unitOfWork.FilmRepository.GetByIdAsync(request.Id);
        if (film == null)
            throw new NotFoundException("Phim không tồn tại");

        film.IsDelete = true;
        film.DeletedAt = DateTime.Now;
        _unitOfWork.SaveChanges();
        return true;
    }
}
