using System;
using Amazon.Runtime.Internal;
using AutoMapper;
using MediatR;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class BannerDeleteCommandHandler : BaseHandler, IRequestHandler<BannerDeleteCommand, bool>
{
    public BannerDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(BannerDeleteCommand request, CancellationToken cancellationToken)
    {
        var banner = await _unitOfWork.BannerRepository.GetByIdAsync(request.Id) ?? throw new NotFoundException("Slide không tồn tại");
        _unitOfWork.Context.Banners.Remove(banner);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
