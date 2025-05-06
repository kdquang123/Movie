using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class RoomGetAllQueryHandler : BaseHandler, IRequestHandler<RoomGetAllQuery, IEnumerable<RoomViewModel>>
{
    public RoomGetAllQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<IEnumerable<RoomViewModel>> Handle(RoomGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.RoomRepository.GetQuery();
        var rooms = await query.Where(r => r.IsDelete == false).ToListAsync(cancellationToken: cancellationToken);
        return _mapper.Map<IEnumerable<RoomViewModel>>(rooms);
    }
}
