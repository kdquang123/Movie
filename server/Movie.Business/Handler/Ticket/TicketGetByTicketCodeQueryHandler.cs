using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Movie.Business.ViewModels;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class TicketGetByTicketCodeQueryHandler : BaseHandler, IRequestHandler<TicketGetByTicketCodeQuery, TicketOfBookingViewModel>
{
    public TicketGetByTicketCodeQueryHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<TicketOfBookingViewModel> Handle(TicketGetByTicketCodeQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.TicketRepository.GetQuery().Where(t => t.TicketCode == request.TicketCode)
        .Include(t => t.Seat)
        .Include(t => t.Booking).ThenInclude(b => b!.Showtime).ThenInclude(st => st!.Film)
        .Include(t => t.Booking).ThenInclude(b => b!.Showtime).ThenInclude(st => st!.Room)
        .AsSplitQuery().FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException("Không tìm thấy vé");
        return _mapper.Map<TicketOfBookingViewModel>(result);
    }
}
