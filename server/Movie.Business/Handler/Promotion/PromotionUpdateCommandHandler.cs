using System;
using AutoMapper;
using MediatR;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class PromotionUpdateCommandHandler : BaseHandler, IRequestHandler<PromotionUpdateCommand, bool>
{
    public PromotionUpdateCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(PromotionUpdateCommand request, CancellationToken cancellationToken)
    {
        var promotion = await _unitOfWork.PromotionRepository.GetByIdAsync(request.Id);
        if (promotion == null) throw new NotFoundException("Khuyến mãi không tồn tại");
        promotion.Name = request.Name;
        promotion.Code = request.Code;
        promotion.Description = request.Description;
        promotion.DiscountType = request.DiscountType;
        promotion.DiscountValue = request.DiscountValue;
        promotion.StartDate = request.StartDate;
        promotion.EndDate = request.EndDate;
        promotion.UsageLimit = request.UsageLimit;
        promotion.MinOrderAmount = request.MinOrderAmount;
        promotion.UpdatedAt = DateTime.Now;
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
