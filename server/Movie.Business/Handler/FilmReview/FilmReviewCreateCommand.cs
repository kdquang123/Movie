using System;
using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Movie.Business.Handler;

public class FilmReviewCreateCommand : IRequest<bool>
{
    public Guid UserId { get; set; }
    public Guid FilmId { get; set; }
    [Required(ErrorMessage ="Nhận xét không được để trống")]
    public required string Review { get; set; }
    [Required(ErrorMessage ="Bạn phải đánh giá")]
    public required int Rating { get; set; }
}
