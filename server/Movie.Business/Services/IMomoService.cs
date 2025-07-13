using System;
using Movie.Models;

namespace Movie.Business.Services;

public interface IMomoService
{
    Task<string> CreatePaymentAsync(Booking model);
}
