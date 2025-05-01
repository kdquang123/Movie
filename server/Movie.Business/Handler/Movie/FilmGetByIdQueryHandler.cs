using System;
using AutoMapper;
using MediatR;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class FilmGetByIdQueryHandler : BaseHandler, IRequestHandler<FilmGetByIdQuery, FilmDetailViewModel>
{
    public FilmGetByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public Task<FilmDetailViewModel> Handle(FilmGetByIdQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
