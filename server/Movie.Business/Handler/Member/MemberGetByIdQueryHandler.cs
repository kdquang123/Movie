using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Movie.Business.ViewModels;
using Movie.Data.UnitOfWorks;
using Movie.Models;

namespace Movie.Business.Handler;

public class MemberGetByIdQueryHandler : UserBaseHandler, IRequestHandler<MemberGetByIdQuery, MemberViewModel>
{
    public MemberGetByIdQueryHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWork unitOfWork, IMapper mapper) : base(userManager, roleManager, unitOfWork, mapper)
    {
    }

    public async Task<MemberViewModel> Handle(MemberGetByIdQuery request, CancellationToken cancellationToken)
    {
        var member = _unitOfWork.UserRepository.GetById(request.Id);
        return _mapper.Map<MemberViewModel>(member);
    }
}
