using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class MemberUpdateCommandHandler : UserBaseHandler, IRequestHandler<MemberUpdateCommand, bool>
{
    public MemberUpdateCommandHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<bool> Handle(MemberUpdateCommand request, CancellationToken cancellationToken)
    {
        var member = _unitOfWork.UserRepository.GetById(request.Id);
        if (member == null)
        {
            return false;
        }

        member.FullName = request.FullName;
        member.DateOfBirth = request.DateOfBirth;
        member.Gender = request.Gender == 1 ? true : (request.Gender == 0 ? false : null);
        member.Address = request.Address;
        member.Email = request.Email;
        member.PhoneNumber = request.PhoneNumber;

        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
