using System;
using MediatR;

namespace Movie.Business.Handler;

public class MemberCreateCommand : IRequest<bool>
{
    public required string FullName { get; set; }
    public required DateTime DateOfBirth { get; set; }
    public required int Gender { get; set; }
    public string? Address { get; set; }
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
}
