using System;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class FilmReviewCreateCommandHandler : BaseHandler, IRequestHandler<FilmReviewCreateCommand, bool>
{
    public FilmReviewCreateCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(FilmReviewCreateCommand request, CancellationToken cancellationToken)
    {
        var review = new FilmReview
        {
            FilmId = request.FilmId,
            Comment = request.Review,
            Rating = request.Rating,
            UserId = request.UserId
        };

        _unitOfWork.FilmReviewRepository.Add(review);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
