using System;

namespace Movie.Business.ViewModels;

public class AgeRestrictionViewModel
{
    public Guid Id { get; set; }
    public required string Code { get; set; }
    public required string Description { get; set; }
    public int? MinAge { get; set; }
}
