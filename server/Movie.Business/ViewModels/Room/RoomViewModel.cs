using System;
using Movie.Models;

namespace Movie.Business.ViewModels;

public class RoomViewModel
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public int SeatQuantity { get; set; }
    public int TotalRows { get; set; }
    public int TotalColumns { get; set; }
    public ICollection<SeatViewModel>? Seats { get; set; }
    public RoomTypeViewModel? RoomType { get; set; }
    public string Status { get; set; } = "";
}
