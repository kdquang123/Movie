using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class PromotionGetByCodeQueryHandler : BaseHandler, IRequestHandler<PromotionGetByCodeQuery, PromotionViewModel>
{
    public PromotionGetByCodeQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PromotionViewModel> Handle(PromotionGetByCodeQuery request, CancellationToken cancellationToken)
    {
        var promotion = await _unitOfWork.PromotionRepository.GetQuery()
            .FirstOrDefaultAsync(x => x.Code == request.Code && x.IsDelete == false, cancellationToken: cancellationToken)
            ?? throw new NotFoundException("Khuyến mãi không tồn tại");

        if (promotion.EndDate < DateTime.Now)
        {
            throw new NotFoundException("Khuyến mãi đã kết thúc");
        }

        if (promotion.StartDate > DateTime.Now)
        {
            throw new NotFoundException("Khuyến mãi chưa bắt đầu");
        }

        if (promotion.MinOrderAmount != null && promotion.MinOrderAmount > request.OrderAmount)
        {
            throw new NotFoundException("Giá trị đơn hàng không đủ để áp dụng khuyến mãi");
        }
        if (promotion.UsageLimit != null && promotion.UsageLimit <= 0)
        {
            throw new NotFoundException("Khuyến mãi đã hết lượt sử dụng");
        }
        return _mapper.Map<PromotionViewModel>(promotion);
    }
}
