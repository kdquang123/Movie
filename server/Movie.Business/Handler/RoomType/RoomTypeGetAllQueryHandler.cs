using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class RoomTypeGetAllQueryHandler : BaseHandler, IRequestHandler<RoomTypeGetAllQuery, IEnumerable<RoomTypeViewModel>>
{
    public RoomTypeGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<RoomTypeViewModel>> Handle(RoomTypeGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.RoomTypeRepository.GetQuery();
        var roomTypes = await query.ToListAsync(cancellationToken: cancellationToken);
        return _mapper.Map<IEnumerable<RoomTypeViewModel>>(roomTypes);
    }
}
