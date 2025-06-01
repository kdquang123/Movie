using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Movie.Business.Handler;

public class BannerCreateCommand : IRequest<bool>
{
    [Required(ErrorMessage = "Ảnh không được bỏ trống")]
    public required IFormFile Image { get; set; }
    public Guid? MovieId { get; set; }
    public Guid? NewsId { get; set; }
    [Required(ErrorMessage = "Loại banner không được bỏ trống")]
    public required string BannerType { get; set; }
}
