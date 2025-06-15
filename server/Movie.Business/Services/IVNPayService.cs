using System;
using Movie.Models;

namespace Movie.Business.Services;

public interface IVNPayService
{
    string CreatePaymentUrl(Booking booking);
}
