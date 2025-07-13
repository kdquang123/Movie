using System;
using AutoMapper;
using MediatR;
using Movie.Business.Services;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class BannerCreateCommandHandler : BaseHandler, IRequestHandler<BannerCreateCommand, bool>
{
    private readonly IFileService _fileService;

    public BannerCreateCommandHandler(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _fileService = fileService;
    }

    public async Task<bool> Handle(BannerCreateCommand request, CancellationToken cancellationToken)
    {
        var imageUrl = await _fileService.UploadFileAsync(request.Image, "banner");
        var newBanner = new Banner
        {
            Id = Guid.NewGuid(),
            ImageUrl = imageUrl,
            BannerType = request.BannerType == "Movie" ? BannerType.Movie : BannerType.News,
            CreatedAt = DateTime.Now
        };

        if (request.MovieId != null)
        {
            newBanner.FilmId = request.MovieId;
        }

        if (request.NewsId != null)
        {
            newBanner.NewsId = request.NewsId;
        }


        _unitOfWork.BannerRepository.Add(newBanner);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
