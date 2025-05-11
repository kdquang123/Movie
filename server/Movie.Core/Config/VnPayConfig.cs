using System;

namespace Movie.Core.Config;

public class VnPayConfig
{
    public const string Vnp_Version = "2.1.0";
    public const string Vnp_Command = "pay";
    public const string Vnp_TmnCode = "2QXUI4"; // mã test VNPAY cung cấp
    public const string Vnp_HashSecret = "SECRETKEY123456789"; // chuỗi bí mật test
    public const string Vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // hoặc link production
    public const string Vnp_ReturnUrl = "https://yourdomain.com/payment-return";
}
