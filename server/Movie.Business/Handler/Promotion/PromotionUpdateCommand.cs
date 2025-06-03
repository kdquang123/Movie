using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class PromotionUpdateCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    [Required(ErrorMessage = "Mã khuyến mãi không được bỏ trống")]
    public required string Code { get; set; }
    [Required(ErrorMessage = "Tên khuyến mãi không được bỏ trống")]
    public required string Name { get; set; }
    public string? Description { get; set; }
    [Required(ErrorMessage = "Loại khuyến mãi không được bỏ trống")]
    public required string DiscountType { get; set; }
    [Required(ErrorMessage = "Giá trị khuyến mãi không được bỏ trống")]
    public decimal DiscountValue { get; set; }
    [Required(ErrorMessage = "Ngày bắt đầu không được bỏ trống")]
    public DateTime StartDate { get; set; }
    [Required(ErrorMessage = "Ngày kết thúc không được bỏ trống")]
    public DateTime EndDate { get; set; }
    public int? UsageLimit { get; set; }
    public decimal? MinOrderAmount { get; set; }
}
