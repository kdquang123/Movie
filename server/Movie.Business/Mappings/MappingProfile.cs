using System;
using System.Formats.Tar;
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
        CreateMap<Room, RoomViewModel>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.IsActive == true ? "Hoạt động" : "Ngừng hoạt động")).ReverseMap();
        CreateMap<RoomTypeViewModel, RoomType>().ReverseMap();
        CreateMap<Seat, SeatViewModel>().ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString())).ReverseMap();
        CreateMap<Showtime, ShowtimeViewModel>()
        .ForMember(dest => dest.MovieId, opt => opt.MapFrom(src => src.FilmId))
        .ForMember(dest => dest.Movie, opt => opt.MapFrom(src => src.Film))
        .ReverseMap();
    }
}
