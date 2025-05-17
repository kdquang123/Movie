using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class MemberDeleteCommandHandler : UserBaseHandler, IRequestHandler<MemberDeleteCommand, bool>
{
    public MemberDeleteCommandHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(MemberDeleteCommand request, CancellationToken cancellationToken)
    {
        var member = _unitOfWork.UserRepository.GetQuery().Where(e => e.Id == request.Id).FirstOrDefault();
        if (member == null)
        {
            return false;
        }

        member.DeletedAt = DateTime.Now;
        member.IsDelete = true;
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
