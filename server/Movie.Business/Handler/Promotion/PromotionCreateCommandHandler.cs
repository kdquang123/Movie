using System;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class PromotionCreateCommandHandler : BaseHandler, IRequestHandler<PromotionCreateCommand, bool>
{
    public PromotionCreateCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(PromotionCreateCommand request, CancellationToken cancellationToken)
    {
        var newPromotion = new Promotion
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Code = request.Code,
            Description = request.Description,
            DiscountType = request.DiscountType,
            DiscountValue = request.DiscountValue,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            UsageLimit = request.UsageLimit,
            MinOrderAmount = request.MinOrderAmount,
            CreatedAt = DateTime.Now
        };


        _unitOfWork.PromotionRepository.Add(newPromotion);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
