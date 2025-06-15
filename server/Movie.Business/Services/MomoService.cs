using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Movie.Models;
using Movie.Business.ViewModels;


namespace Movie.Business.Services;

public class MomoService : IMomoService
{
    public async Task<string> CreatePaymentAsync(Booking model)
    {
        string accessKey = "F8BBA842ECF85";
        string secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

        QuickPayRequest request = new QuickPayRequest();
        request.orderInfo = "pay with MoMo";
        request.partnerCode = "MOMO";
        request.redirectUrl = "http://localhost:5095/api/Bookings/payment-callback";
        request.ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
        request.amount = (long)model.TotalPrice;
        request.orderId = model.BookingCode;
        request.requestId = model.BookingCode;
        request.extraData = "";
        request.partnerName = "MoMo Payment";
        request.storeId = "Test Store";
        request.orderGroupId = "";
        request.autoCapture = true;
        request.requestType = "captureWallet";
        request.lang = "vi";
        request.expireTime = new DateTimeOffset(model.ExpireAt).ToUnixTimeMilliseconds();


        var rawSignature = $"accessKey={accessKey}&amount={request.amount}&extraData={request.extraData}&ipnUrl={request.ipnUrl}&orderId={request.orderId}&orderInfo={request.orderInfo}&partnerCode={request.partnerCode}&redirectUrl={request.redirectUrl}&requestId={request.requestId}&requestType={request.requestType}";
        request.signature = ComputeHmacSha256(rawSignature, secretKey);

        var client = new HttpClient();

        StringContent httpContent = new StringContent(JsonSerializer.Serialize(request), System.Text.Encoding.UTF8, "application/json");
        var quickPayResponse = await client.PostAsync("https://test-payment.momo.vn/v2/gateway/api/create", httpContent);
        var json = await quickPayResponse.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);
        var payUrl = doc.RootElement.GetProperty("payUrl").GetString();
        return payUrl!;
    }

    private string ComputeHmacSha256(string message, string secretKey)
    {
        var keyBytes = Encoding.UTF8.GetBytes(secretKey);
        var messageBytes = Encoding.UTF8.GetBytes(message);

        byte[] hashBytes;

        using (var hmac = new HMACSHA256(keyBytes))
        {
            hashBytes = hmac.ComputeHash(messageBytes);
        }

        var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

        return hashString;
    }

}
