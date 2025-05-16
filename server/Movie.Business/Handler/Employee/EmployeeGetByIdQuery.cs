using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class EmployeeGetByIdQuery : IRequest<EmployeeViewModel>
{
    public Guid Id { get; set; }
}
