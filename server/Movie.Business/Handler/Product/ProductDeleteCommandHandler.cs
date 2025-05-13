using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ProductDeleteCommandHandler : BaseHandler, IRequestHandler<ProductDeleteCommand, bool>
{
    public ProductDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(ProductDeleteCommand request, CancellationToken cancellationToken)
    {
        var product = await _unitOfWork.ProductRepository.GetQuery().Where(p => p.Id == request.Id).FirstOrDefaultAsync(cancellationToken);
        if (product == null)
        {
            return false;
        }
        product!.IsDelete = true;
        product.DeletedAt = DateTime.Now;
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
