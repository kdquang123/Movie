using System;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class RoomSearchQuery : BaseSearchQuery<RoomViewModel>
{
    public string RoomTypeId { get; set; } = "";
    public int? Status { get; set; } = null;
}
