using System;

namespace Movie.Business.ViewModels.Auth;

public class LoginResponse
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
    public DateTime ExpiresAt { get; set; }

    public UserInformation? UserInfo { get; set; }
}

public class UserInformation
{
    public Guid Id { get; set; }
    public string? FullName { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public IList<string> Roles { get; set; } = [];
}