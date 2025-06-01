using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class FilmGetByIdQueryHandler : BaseHandler, IRequestHandler<FilmGetByIdQuery, FilmViewModel>
{
    public FilmGetByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<FilmViewModel> Handle(FilmGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.FilmRepository.GetQuery();
        var result = await query.Include(x => x.AgeRestriction!).Include(x => x.FilmCategories!).ThenInclude(fc => fc.Category).FirstOrDefaultAsync(c => c.Id == request.Id && c.IsDelete == false, cancellationToken) ?? throw new NotFoundException("Phim không tồn tại");
        return _mapper.Map<FilmViewModel>(result);
    }
}
