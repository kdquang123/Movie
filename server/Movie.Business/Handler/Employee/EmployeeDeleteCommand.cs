using System;
using MediatR;

namespace Movie.Business.Handler;

public class EmployeeDeleteCommand:IRequest<bool>
{
    public Guid Id { get; set; }
}
