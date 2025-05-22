using System;
using AutoMapper;
using MediatR;
using Movie.Business.Services;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class NewsUpdateCommandHandler : BaseHandler, IRequestHandler<NewsUpdateCommand, bool>
{
    private readonly IFileService _fileService;
    public NewsUpdateCommandHandler(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _fileService = fileService;
    }

    public async Task<bool> Handle(NewsUpdateCommand request, CancellationToken cancellationToken)
    {
        var imageUrl = "";
        if (request.Image != null)
        {
            imageUrl = await _fileService.UploadFileAsync(request.Image, "news");
        }
        var news = await _unitOfWork.NewsRepository.GetByIdAsync(request.Id);
        if (news == null) return false;
        news.Title = request.Title;
        news.Content = request.Content;

        news.Category = request.Category == "Event" ? NewsCategory.Event : (request.Category == "News" ? NewsCategory.News : NewsCategory.Promotion);
        news.UpdatedAt = DateTime.Now;

        if (!String.IsNullOrEmpty(imageUrl))
        {
            news.ImageUrl = imageUrl;
        }
        var result = await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
