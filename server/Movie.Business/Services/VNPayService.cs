using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Movie.Core.Config;
using Movie.Core.Library;
using Movie.Models;

namespace Movie.Business.Services;

public class VNPayService : IVNPayService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly VnPayConfig _config;

    public VNPayService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _config = new VnPayConfig();
    }

    public string CreatePaymentUrl(Booking booking)
    {
        var tick = booking.BookingCode;

        var pay = new VnPayLibrary();
        pay.AddRequestData("vnp_Version", "2.1.0");
        pay.AddRequestData("vnp_Command", "pay");
        pay.AddRequestData("vnp_TmnCode", _config.TmnCode);
        pay.AddRequestData("vnp_Amount", ((long)booking.TotalPrice * 100).ToString()); // nhân 100 vì VNPAY dùng đơn vị là đồng
        pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
        pay.AddRequestData("vnp_ExpireDate", booking.ExpireAt.AddMinutes(-1).ToString("yyyyMMddHHmmss"));
        pay.AddRequestData("vnp_CurrCode", "VND");
        pay.AddRequestData("vnp_IpAddr", _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString());
        pay.AddRequestData("vnp_Locale", "vn");
        pay.AddRequestData("vnp_BankCode", "NCB");
        pay.AddRequestData("vnp_OrderInfo", booking.BookingCode);
        pay.AddRequestData("vnp_OrderType", "other");
        pay.AddRequestData("vnp_ReturnUrl", _config.ReturnUrl);
        pay.AddRequestData("vnp_TxnRef", tick); // Mã giao dịch duy nhất

        var paymentUrl = pay.CreateRequestUrl(_config.BaseUrl, _config.HashSecret);
        return paymentUrl;
    }

}