using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.Services;
using Movie.Data.UnitOfWorks;
using Movie.Models.Models;

namespace Movie.Business.Handler;

public class FilmUpdateCommandHandler : BaseHandler, IRequestHandler<FilmUpdateCommand, bool>
{
    private readonly IFileService _fileService;
    public FilmUpdateCommandHandler(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _fileService = fileService;
    }

    public async Task<bool> Handle(FilmUpdateCommand request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.FilmRepository.GetQuery();
        var film = await query.Include(x => x.FilmCategories).FirstOrDefaultAsync(c => c.Id == request.Id && c.IsDelete == false, cancellationToken);
        if (film == null || film.IsDelete)
        {
            return false;
        }

        if (request.Poster != null)
        {
            var fileName = await _fileService.UploadFileAsync(request.Poster, "poster");
            film.ImageUrl = fileName;
        }

        film.Name = request.Name;
        film.Description = request.Description;
        film.Director = request.Director;
        film.Actors = request.Actors;
        film.Duration = request.Duration;
        film.ReleaseDate = request.ReleaseDate;
        film.EndDate = request.EndDate;
        film.TrailerUrl = request.TrailerUrl;
        film.IMDbScore = request.IMDbScore;
        film.AgeRestrictionId = request.AgeRestrictionId;
        film.UpdatedAt = DateTime.Now;
        if (request.Categories != null && request.Categories.Count > 0)
        {
            film.FilmCategories!.Clear();
        }

        foreach (var categoryId in request.Categories!)
        {
            var filmCategory = new FilmCategory
            {
                FilmId = film.Id,
                CategoryId = categoryId
            };
            film.FilmCategories!.Add(filmCategory);
        }
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
