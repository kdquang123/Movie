using System;
using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Movie.Business.Handler;

public class RoomCreateCommand : IRequest<bool>
{
    [Required(ErrorMessage = "Tên phòng không được bỏ trống")]
    public required string Name { get; set; }
    [Required(ErrorMessage = "Số hàng ghế không được bỏ trống")]
    public required int TotalRows { get; set; }
    [Required(ErrorMessage = "Số ghế mỗi hàng không được bỏ trống")]
    public required int TotalColumns { get; set; }
    [Required(ErrorMessage = "Loại phòng không được bỏ trống")]
    public Guid RoomTypeId { get; set; }
}
