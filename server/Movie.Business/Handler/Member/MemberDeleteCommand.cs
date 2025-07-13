using System;
using MediatR;

namespace Movie.Business.Handler;

public class MemberDeleteCommand:IRequest<bool>
{
    public Guid Id { get; set; }
}
