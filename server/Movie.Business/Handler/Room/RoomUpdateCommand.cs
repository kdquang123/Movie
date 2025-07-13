using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class RoomUpdateCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    [Required(ErrorMessage = "Tên phòng không được bỏ trống")]
    public required string Name { get; set; }
    [Required(ErrorMessage = "Loại phòng không được bỏ trống")]
    public Guid RoomTypeId { get; set; }
}
