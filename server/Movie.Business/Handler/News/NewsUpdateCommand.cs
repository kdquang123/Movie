using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Microsoft.AspNetCore.Http;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class NewsUpdateCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    [Required(ErrorMessage = "Tiêu đề không được bỏ trống")]
    public required string Title { get; set; }
    [Required(ErrorMessage = "Nội dung không được bỏ trống")]
    public required string Content { get; set; }
    public IFormFile? Image { get; set; }
    [Required(ErrorMessage = "Loại tin tức không được bỏ trống")]
    public required string Category { get; set; }
}
