using System;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Movie.Business.Handler;

public class ProductCreateCommand : IRequest<bool>
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required decimal Price { get; set; }
    public required IFormFile ProductImage { get; set; }
    public int Quantity { get; set; }
}
