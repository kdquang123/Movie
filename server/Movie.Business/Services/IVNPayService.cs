using System;
using Movie.Models;

namespace Movie.Business.Services;

public interface IVNPayService
{
    public string CreatePaymentUrl(Booking booking);
}
