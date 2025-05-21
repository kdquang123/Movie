using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
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
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.IsDelete == false, cancellationToken: cancellationToken);
        // if (news == null)
        // {
        //     throw new Exception("News not found");
        // }
        return _mapper.Map<NewsViewModel>(news);
    }
}
