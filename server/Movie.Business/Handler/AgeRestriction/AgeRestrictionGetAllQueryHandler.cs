using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class AgeRestrictionGetAllQueryHandler : BaseHandler, IRequestHandler<AgeRestrictionGetAllQuery, IEnumerable<AgeRestrictionViewModel>>
{
    public AgeRestrictionGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<AgeRestrictionViewModel>> Handle(AgeRestrictionGetAllQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.AgeRestrictionRepository.GetQuery().ToListAsync();
        return _mapper.Map<IEnumerable<AgeRestrictionViewModel>>(result);
    }
}
