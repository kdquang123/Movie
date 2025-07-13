using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class BannerGetAllQueryHandler : BaseHandler, IRequestHandler<BannerGetAllQuery, IEnumerable<BannerViewModel>>
{
    public BannerGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<BannerViewModel>> Handle(BannerGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.BannerRepository.GetQuery();
        query = query.Include(q => q.Film).Include(q => q.News);
        var rooms = await query.Where(r => r.IsDelete == false).ToListAsync(cancellationToken: cancellationToken);
        return _mapper.Map<IEnumerable<BannerViewModel>>(rooms);
    }
}
