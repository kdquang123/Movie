using System;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class FimlDeleteCommandHandler : BaseHandler, IRequestHandler<FilmDeleteCommand, bool>
{
    public FimlDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(FilmDeleteCommand request, CancellationToken cancellationToken)
    {
        var film = _unitOfWork.FilmRepository.GetById(request.Id);
        if (film == null)
            return false;

        film.IsDelete = true;
        film.DeletedAt = DateTime.UtcNow;
        _unitOfWork.SaveChanges();
        return true;
    }
}
