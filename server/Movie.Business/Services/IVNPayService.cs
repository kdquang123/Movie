using System;

namespace Movie.Business.Services;

public interface IVNPayService
{
    public string CreatePaymentUrl(decimal amount, string bookingId);

    public string HmacSHA256(string input, string key);
}
