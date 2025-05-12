using System;

namespace Movie.Core.Config;

public class VnPayConfig
{
    public string TmnCode { get; set; } = "8T0RJR1I";
    public string HashSecret { get; set; } = "CP4WZL68VK88N2K7DTCPYZEMMTY5WZ5V";
    public string BaseUrl { get; set; } = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public string ReturnUrl { get; set; } = "http://localhost:5095/api/Bookings/payment-callback";
    public const string Vnp_Version = "2.1.0";
    public const string Vnp_Command = "pay";
    public const string Vnp_TmnCode = "8T0RJR1I";
    public const string Vnp_HashSecret = "CP4WZL68VK88N2K7DTCPYZEMMTY5WZ5V";
    public const string Vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public const string Vnp_ReturnUrl = "http://localhost:5095/api/Bookings/payment-callback";
    public const string Vnp_BankCode = "";
}