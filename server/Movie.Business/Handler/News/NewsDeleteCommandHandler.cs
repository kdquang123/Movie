using System;
using Amazon.Runtime.Internal;
using AutoMapper;
using MediatR;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class NewsDeleteCommandHandler : BaseHandler, IRequestHandler<NewsDeleteCommand, bool>
{
    public NewsDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(NewsDeleteCommand request, CancellationToken cancellationToken)
    {
        var news = await _unitOfWork.NewsRepository.GetByIdAsync(request.Id);
        if (news == null) return false;
        news.IsDelete = true;
        news.DeletedAt = DateTime.Now;
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
