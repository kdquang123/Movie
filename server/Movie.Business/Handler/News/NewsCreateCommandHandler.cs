using System;
using AutoMapper;
using MediatR;
using Movie.Business.Services;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class NewsCreateCommandHandler : BaseHandler, IRequestHandler<NewsCreateCommand, bool>
{
    private readonly IFileService _fileService;

    public NewsCreateCommandHandler(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _fileService = fileService;
    }

    public async Task<bool> Handle(NewsCreateCommand request, CancellationToken cancellationToken)
    {
        var imageUrl = await _fileService.UploadFileAsync(request.Image, "news");
        var newNews = new News
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Content = request.Content,
            ImageUrl = imageUrl,
            Category = request.Category == "Event" ? NewsCategory.Event : (request.Category == "News" ? NewsCategory.News : NewsCategory.Promotion),
            CreatedAt = DateTime.Now
        };


        _unitOfWork.NewsRepository.Add(newNews);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
