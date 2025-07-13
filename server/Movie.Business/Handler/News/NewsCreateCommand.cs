using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Movie.Business.Handler;

public class NewsCreateCommand : IRequest<bool>
{
    [Required(ErrorMessage = "Tiêu đề không được bỏ trống")]
    public required string Title { get; set; }
    [Required(ErrorMessage = "Nội dung không được bỏ trống")]
    public required string Content { get; set; }
    [Required(ErrorMessage = "Ảnh không được bỏ trống")]
    public required IFormFile Image { get; set; }
    [Required(ErrorMessage = "Loại tin tức không được bỏ trống")]
    public required string Category { get; set; }
}
