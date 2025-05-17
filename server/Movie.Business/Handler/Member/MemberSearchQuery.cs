using System;
using Movie.Business.ViewModels;
using Movie.Core.ViewModels;

namespace Movie.Business.Handler;

public class MemberSearchQuery : BaseSearchQuery<MemberViewModel>
{
    public string Status { get; set; } = "";
}
