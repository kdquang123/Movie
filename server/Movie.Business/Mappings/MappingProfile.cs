using System;
using AutoMapper;
using Movie.Business.ViewModels;
using Movie.Models;

namespace Movie.Business.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<FilmViewModel, Film>().ReverseMap();
        CreateMap<FilmDetailViewModel, Film>().ReverseMap();
        CreateMap<CategoryViewModel, Category>().ReverseMap();
        CreateMap<AgeRestrictionViewModel, AgeRestriction>().ReverseMap();
    }
}
