using System;
using AutoMapper;
using MediatR;
using Movie.Business.Services;
using Movie.Data.UnitOfWorks;
using Movie.Models;
using Movie.Models.Models;

namespace Movie.Business.Handler.Movie;

public class FilmCreateCommandHandler : BaseHandler, IRequestHandler<FilmCreateCommand, bool>
{
    private readonly IFileService _fileService;
    public FilmCreateCommandHandler(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _fileService = fileService;
    }

    public async Task<bool> Handle(FilmCreateCommand request, CancellationToken cancellationToken)
    {
        string imageUrl = "";
        if (request.Poster != null)
        {
            imageUrl = await _fileService.UploadFileAsync(request.Poster);
        }
        var film = new Film
        {
            Name = request.Name,
            Description = request.Description,
            ReleaseDate = request.ReleaseDate,
            EndDate = request.EndDate,
            Director = request.Director,
            Actors = request.Actors,
            Duration = request.Duration,
            IMDbScore = request.IMDbScore,
            AgeRestrictionId = request.AgeRestrictionId,
            ImageUrl = imageUrl,
            TrailerUrl = request.TrailerUrl,
        };

        film.Id = Guid.NewGuid();
        film.CreatedAt = DateTime.UtcNow;

        // Save the film to the database
        _unitOfWork.FilmRepository.Add(film);

        request.Categories.ForEach(c =>
        {
            _unitOfWork.FilmCategoryRepository.Add(new FilmCategory
            {
                FilmId = film.Id,
                CategoryId = c
            });
        });
        var result = await _unitOfWork.SaveChangesAsync();

        // Return true if the operation was successful
        return result > 0;
    }
}
