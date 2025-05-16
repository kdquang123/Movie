using System;
using MediatR;

namespace Movie.Business.Handler;

public class EmployeeUpdateCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public required string FullName { get; set; }
    public required DateTime DateOfBirth { get; set; }
    public required int Gender { get; set; }
    public string? Address { get; set; }
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
}
