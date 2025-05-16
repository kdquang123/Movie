using System;
using Movie.Business.ViewModels;
using Movie.Core.ViewModels;

namespace Movie.Business.Handler;

public class EmployeeSearchQuery : BaseSearchQuery<EmployeeViewModel>
{
    public string Status { get; set; } = "";
}
