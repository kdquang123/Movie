using System;
using Movie.Models;

namespace Movie.Business.ViewModels;

public class SeatViewModel
{
    public required Guid Id { get; set; }
    public int Row { get; set; }
    public int Column { get; set; }
    public string? SeatName { get; set; }
    public string Type { get; set; } = "";
}
