using System;
using AutoMapper;
using MediatR;
using Movie.Business.Services;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class BannerUpdateCommandHandler : BaseHandler, IRequestHandler<BannerUpdateCommand, bool>
{
    private readonly IFileService _fileService;
    public BannerUpdateCommandHandler(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _fileService = fileService;
    }

    public async Task<bool> Handle(BannerUpdateCommand request, CancellationToken cancellationToken)
    {
        var banner = await _unitOfWork.BannerRepository.GetByIdAsync(request.Id) ?? throw new NotFoundException("Slide không tồn tại");
        var imageUrl = "";
        if (request.Image != null)
        {
            imageUrl = await _fileService.UploadFileAsync(request.Image, "banner");
        }

        if (banner == null) return false;
        banner.FilmId = request.MovieId;
        banner.NewsId = request.NewsId;

        banner.UpdatedAt = DateTime.Now;

        if (!String.IsNullOrEmpty(imageUrl))
        {
            banner.ImageUrl = imageUrl;
        }
        var result = await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
