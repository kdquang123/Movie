using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class FilmReviewGetByMovieIdQueryHandler : BaseHandler, IRequestHandler<FilmReviewGetByMovieIdQuery, IEnumerable<FilmReviewViewModel>>
{
    public FilmReviewGetByMovieIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<FilmReviewViewModel>> Handle(FilmReviewGetByMovieIdQuery request, CancellationToken cancellationToken)
    {
        var reviews = await _unitOfWork.FilmReviewRepository.GetQuery().Where(fr => fr.FilmId == request.MovieId).Include(fr => fr.User).ToListAsync();
        return _mapper.Map<IEnumerable<FilmReviewViewModel>>(reviews);
    }
}
