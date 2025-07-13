using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http.Features;
using Movie.Core.Exceptions;
using Movie.Data.UnitOfWorks;

namespace Movie.Business.Handler;

public class ChangeUserStatusCommandHandler : BaseHandler,
    IRequestHandler<ChangeUserStatusCommand, bool>
{
    public ChangeUserStatusCommandHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(ChangeUserStatusCommand request, CancellationToken cancellationToken)
    {
        var user = _unitOfWork.UserRepository.GetById(request.UserId);
        if (user == null)
        {
            throw new NotFoundException("Tài khoản không tồn tại");
        }

        user.IsActive = !user.IsActive;
        _unitOfWork.UserRepository.Update(user);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }
}
