using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Movie.Business.Handler;

public class ProductCreateCommand : IRequest<bool>
{
    [Required(ErrorMessage = "Tên sản phẩm không được bỏ trống")]
    public required string Name { get; set; }
    public string? Description { get; set; }
    [Required(ErrorMessage = "Giá sản phẩm không được bỏ trống")]
    public required decimal Price { get; set; }
    [Required(ErrorMessage = "Ảnh sản phẩm không được bỏ trống")]
    public required IFormFile ProductImage { get; set; }
    [Required(ErrorMessage = "Số lượng sản phẩm không được bỏ trống")]
    public int Quantity { get; set; }
}
