using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class BookingCreateCommand : IRequest<string>
{
    [Required(ErrorMessage = "User Id is required")]
    public required Guid UserId { get; set; }
    public required ShowtimeViewModel Showtime { get; set; }
    public required SeatViewModel[] SeatList { get; set; }
    public BookingDetailViewModel[]? ProductList { get; set; }
    public required string PaymentMethod { get; set; }
    public string? PromotionCode { get; set; }
}
