using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class BannerGetByIdQueryHandler : BaseHandler, IRequestHandler<BannerGetByIdQuery, BannerViewModel>
{
    public BannerGetByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<BannerViewModel> Handle(BannerGetByIdQuery request, CancellationToken cancellationToken)
    {
        var banner = await _unitOfWork.BannerRepository.GetQuery()
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.IsDelete == false, cancellationToken: cancellationToken);
        // if (banner == null)
        // {
        //     throw new Exception("Banner not found");
        // }
        return _mapper.Map<BannerViewModel>(banner);
    }
}
