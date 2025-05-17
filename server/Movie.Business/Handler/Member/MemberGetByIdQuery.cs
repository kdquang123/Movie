using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class MemberGetByIdQuery : IRequest<MemberViewModel>
{
    public Guid Id { get; set; }
}
