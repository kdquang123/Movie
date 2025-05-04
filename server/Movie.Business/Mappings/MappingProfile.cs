using System;
using AutoMapper;
using Movie.Business.ViewModels;
using Movie.Models;

namespace Movie.Business.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Film, FilmViewModel>()
            .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.FilmCategories!.Select(fc => new CategoryViewModel { Id = fc.CategoryId, Name = fc.Category!.Name, Description = fc.Category.Description })))
            .ForMember(dest => dest.AgeRestriction, opt => opt.MapFrom(src => new AgeRestrictionViewModel { Id = src.AgeRestriction!.Id, Code = src.AgeRestriction.Code, Description = src.AgeRestriction.Description }))
            .ReverseMap();
        CreateMap<FilmDetailViewModel, Film>().ReverseMap();
        CreateMap<CategoryViewModel, Category>().ReverseMap();
        CreateMap<AgeRestrictionViewModel, AgeRestriction>().ReverseMap();
    }
}
