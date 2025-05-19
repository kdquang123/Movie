using System;
using Amazon.Runtime.Internal;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class PromotionDeleteCommandHandler : BaseHandler, IRequestHandler<PromotionDeleteCommand, bool>
{
    public PromotionDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(PromotionDeleteCommand request, CancellationToken cancellationToken)
    {
        var promotion = await _unitOfWork.PromotionRepository.GetByIdAsync(request.Id);
        if (promotion == null) return false;
        promotion.IsDelete = true;
        promotion.DeletedAt = DateTime.Now;
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
