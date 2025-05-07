using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class FilmGetAllActiveQueryHandler : BaseHandler, IRequestHandler<FilmGetAllActiveQuery, IEnumerable<FilmViewModel>>
{
    public FilmGetAllActiveQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<FilmViewModel>> Handle(FilmGetAllActiveQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.FilmRepository.GetQuery();
        var films = await query.Where(f => f.IsActive && f.IsDelete == false && f.EndDate > DateTime.UtcNow).ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<FilmViewModel>>(films);
    }
}
