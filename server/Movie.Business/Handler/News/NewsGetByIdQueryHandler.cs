using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class NewsGetByIdQueryHandler : BaseHandler, IRequestHandler<NewsGetByIdQuery, NewsViewModel>
{
    public NewsGetByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<NewsViewModel> Handle(NewsGetByIdQuery request, CancellationToken cancellationToken)
    {
        var news = await _unitOfWork.NewsRepository.GetQuery()
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.IsDelete == false, cancellationToken: cancellationToken) ?? throw new NotFoundException("Tin tức không tồn tại");
        return _mapper.Map<NewsViewModel>(news);
    }
}
