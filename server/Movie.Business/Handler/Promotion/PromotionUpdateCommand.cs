using System;
using MediatR;
using Movie.Business.ViewModels;

namespace Movie.Business.Handler;

public class PromotionUpdateCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public required string Code { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required string DiscountType { get; set; }
    public decimal DiscountValue { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? UsageLimit { get; set; }
    public decimal? MinOrderAmount { get; set; }
}
