using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ProductGetByIdQueryHandler : BaseHandler, IRequestHandler<ProductGetByIdQuery, ProductViewModel>
{
    public ProductGetByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<ProductViewModel> Handle(ProductGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.ProductRepository.GetQuery();
        var product = await query.Where(p => p.Id == request.Id).FirstOrDefaultAsync(cancellationToken);
        return _mapper.Map<ProductViewModel>(product);
    }
}
