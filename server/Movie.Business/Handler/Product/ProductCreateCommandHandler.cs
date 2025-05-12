using System;
using AutoMapper;
using MediatR;
using Movie.Business.Services;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class ProductCreateCommandHandler : BaseHandler, IRequestHandler<ProductCreateCommand, bool>
{
    private readonly IFileService _fileService;

    public ProductCreateCommandHandler(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _fileService = fileService;
    }

    public async Task<bool> Handle(ProductCreateCommand request, CancellationToken cancellationToken)
    {
        string imageUrl = "";
        if (request.ProductImage != null)
        {
            imageUrl = await _fileService.UploadFileAsync(request.ProductImage, "product");
        }

        var product = new Product { Name = request.Name, Description = request.Description, Price = request.Price, ImageUrl = imageUrl, Quantity = request.Quantity, CreatedAt = DateTime.Now };
        _unitOfWork.ProductRepository.Add(product);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
