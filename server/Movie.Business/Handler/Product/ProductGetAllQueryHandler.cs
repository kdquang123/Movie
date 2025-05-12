using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ProductGetAllQueryHandler : BaseHandler, IRequestHandler<ProductGetAllQuery, IEnumerable<ProductViewModel>>
{
    public ProductGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<ProductViewModel>> Handle(ProductGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.ProductRepository.GetQuery();
        var result = await query.Where(p => p.IsDelete == false).ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<ProductViewModel>>(result);
    }
}
