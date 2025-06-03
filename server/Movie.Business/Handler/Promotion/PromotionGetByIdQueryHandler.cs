using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class PromotionGetByIdQueryHandler : BaseHandler, IRequestHandler<PromotionGetByIdQuery, PromotionViewModel>
{
    public PromotionGetByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PromotionViewModel> Handle(PromotionGetByIdQuery request, CancellationToken cancellationToken)
    {
        var promotion = await _unitOfWork.PromotionRepository.GetQuery()
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.IsDelete == false, cancellationToken: cancellationToken) ?? throw new NotFoundException("Khuyến mãi không tồn tại");
        return _mapper.Map<PromotionViewModel>(promotion);
    }
}
