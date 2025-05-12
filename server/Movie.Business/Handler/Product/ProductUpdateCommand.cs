using System;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Movie.Business.Handler;

public class ProductUpdateCommand : IRequest<bool>
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required decimal Price { get; set; }
    public IFormFile? ProductImg { get; set; }
    public int Quantity { get; set; }
}
