using System;
using System.ComponentModel.DataAnnotations;

namespace Movie.Business.ViewModels;

public class UserReviewViewModel
{
    public Guid Id { get; set; }
    public string? FullName { get; set; }
    public string? Email { get; set; }
}
