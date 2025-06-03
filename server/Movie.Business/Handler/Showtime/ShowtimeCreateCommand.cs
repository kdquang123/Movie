using System;
using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Movie.Business.Handler;

public class ShowtimeCreateCommand : IRequest<bool>
{
    [Required(ErrorMessage = "Phim không được để trống")]
    public required Guid MovieId { get; set; }
    [Required(ErrorMessage = "Phòng chiếu không được để trống")]
    public required Guid RoomId { get; set; }
    [Required(ErrorMessage = "Ngày chiếu không được để trống")]
    public required DateTime StartDate { get; set; }
    [Required(ErrorMessage = "Giờ chiếu không được để trống")]
    public required string StartTime { get; set; }
    [Required(ErrorMessage = "Giá chiếu không được để trống")]
    public required decimal BasePrice { get; set; }
    [Required(ErrorMessage = "Giá chiếu không được để trống")]
    public required decimal WeekendPrice { get; set; }
    [Required(ErrorMessage = "Thời lượng không được để trống")]
    public required int Duration { get; set; }
}
