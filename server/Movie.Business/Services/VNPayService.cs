using System;
using System.Text;
using Microsoft.AspNetCore.Http;
using Movie.Core.Config;

namespace Movie.Business.Services;

public class VNPayService : IVNPayService
{
    private readonly IHttpContextAccessor _contextAccessor;

    public VNPayService(IHttpContextAccessor contextAccessor)
    {
        _contextAccessor = contextAccessor;
    }

    public string CreatePaymentUrl(decimal amount, string bookingId)
    {
        var tick = DateTime.UtcNow.Ticks.ToString();
        var vnpayData = new SortedDictionary<string, string>();

        vnpayData.Add("vnp_Version", VnPayConfig.Vnp_Version);
        vnpayData.Add("vnp_Command", VnPayConfig.Vnp_Command);
        vnpayData.Add("vnp_TmnCode", VnPayConfig.Vnp_TmnCode);
        vnpayData.Add("vnp_Amount", ((int)(amount * 100)).ToString()); // nhân 100 theo yêu cầu VNPAY
        vnpayData.Add("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
        vnpayData.Add("vnp_CurrCode", "VND");
        vnpayData.Add("vnp_IpAddr", _contextAccessor.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1");
        vnpayData.Add("vnp_Locale", "vn");
        vnpayData.Add("vnp_OrderInfo", $"Thanh toan don hang {bookingId}");
        vnpayData.Add("vnp_OrderType", "other");
        vnpayData.Add("vnp_ReturnUrl", VnPayConfig.Vnp_ReturnUrl);
        vnpayData.Add("vnp_TxnRef", bookingId); // mã đơn hàng

        // Tạo chuỗi query và hash
        var query = new StringBuilder();
        foreach (var kv in vnpayData)
        {
            query.AppendFormat("{0}={1}&", kv.Key, Uri.EscapeDataString(kv.Value));
        }

        var rawData = string.Join("&", vnpayData.Select(x => $"{x.Key}={x.Value}"));
        var hash = HmacSHA256(rawData, VnPayConfig.Vnp_HashSecret);

        var paymentUrl = $"{VnPayConfig.Vnp_Url}?{query}vnp_SecureHash={hash}";
        return paymentUrl;
    }

    public string HmacSHA256(string input, string key)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA256(Encoding.UTF8.GetBytes(key)))
        {
            var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(input));
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }
}
