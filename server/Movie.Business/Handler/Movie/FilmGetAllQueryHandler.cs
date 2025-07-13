using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler.Movie;

public class FilmGetAllQueryHandler : BaseHandler, IRequestHandler<FilmGetAllQuery, IEnumerable<FilmViewModel>>
{
    public FilmGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<FilmViewModel>> Handle(FilmGetAllQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.FilmRepository.GetQuery().ToListAsync();
        return _mapper.Map<IEnumerable<FilmViewModel>>(result);
    }
}
