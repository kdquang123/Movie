using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class CategoryGetAllQueryHandler : BaseHandler, IRequestHandler<CategoryGetAllQuery, IEnumerable<CategoryViewModel>>
{
    public CategoryGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<CategoryViewModel>> Handle(CategoryGetAllQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.CategoryRepository.GetQuery().ToListAsync();
        return _mapper.Map<IEnumerable<CategoryViewModel>>(result);
    }
}
