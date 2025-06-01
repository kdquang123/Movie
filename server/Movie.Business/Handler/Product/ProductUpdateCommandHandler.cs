using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.Services;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ProductUpdateCommandHandler : BaseHandler, IRequestHandler<ProductUpdateCommand, bool>
{
    private readonly IFileService _fileService;

    public ProductUpdateCommandHandler(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        _fileService = fileService;
    }

    public async Task<bool> Handle(ProductUpdateCommand request, CancellationToken cancellationToken)
    {
        var product = await _unitOfWork.ProductRepository.GetQuery().Where(p => p.Id == request.Id).FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException("Sản phẩm không tồn tại");
        if (product == null)
        {
            return false;
        }

        if (request.ProductImage != null)
        {
            var imageUrl = await _fileService.UploadFileAsync(request.ProductImage, "product");
            product!.ImageUrl = imageUrl;
        }
        product!.Name = request.Name;
        product!.Description = request.Description;
        product!.Price = request.Price;
        product!.Quantity = request.Quantity;
        product.UpdatedAt = DateTime.Now;
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
