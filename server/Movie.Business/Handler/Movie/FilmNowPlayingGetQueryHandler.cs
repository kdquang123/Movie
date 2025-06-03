using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class FilmNowPlayingGetQueryHandler : BaseHandler, IRequestHandler<FilmNowPlayingGetQuery, IEnumerable<FilmViewModel>>
{
    public FilmNowPlayingGetQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<FilmViewModel>> Handle(FilmNowPlayingGetQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.FilmRepository.GetQuery();
        var result = await query.Where(c => c.IsDelete == false && c.ReleaseDate < DateTime.UtcNow && c.EndDate > DateTime.Now).Include(f => f.FilmCategories!).ThenInclude(fc => fc.Category).ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<FilmViewModel>>(result);
    }
}