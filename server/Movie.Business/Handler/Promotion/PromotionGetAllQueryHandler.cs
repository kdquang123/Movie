using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class PromotionGetAllQueryHandler : BaseHandler, IRequestHandler<PromotionGetAllQuery, IEnumerable<PromotionViewModel>>
{
    public PromotionGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<PromotionViewModel>> Handle(PromotionGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.PromotionRepository.GetQuery();
        var rooms = await query.Where(r => r.IsDelete == false).ToListAsync(cancellationToken: cancellationToken);
        return _mapper.Map<IEnumerable<PromotionViewModel>>(rooms);
    }
}
