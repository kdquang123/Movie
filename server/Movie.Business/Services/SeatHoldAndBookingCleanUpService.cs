using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Movie.Data;
using Movie.Models;

namespace Movie.Business.Services;

public class SeatHoldAndBookingCleanUpService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    public SeatHoldAndBookingCleanUpService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<MovieDbContext>();

            var expiredHolds = db.SeatHolds
                .Where(sh => sh.ExpireAt < DateTime.Now);
            var expiredBookings = db.Bookings.Where(b => b.ExpireAt < DateTime.Now && b.BookingStatus == BookingStatus.Pending);
            var notUsedBookings = db.Bookings.Include(b=>b.Showtime)
                .Where(b => b.Showtime!.EndTime < DateTime.Now && b.BookingStatus == BookingStatus.Paid);
            foreach (var booking in notUsedBookings)
            {
                booking.BookingStatus = BookingStatus.Cancelled;
            }
            db.Bookings.RemoveRange(expiredBookings);
            db.SeatHolds.RemoveRange(expiredHolds);
            await db.SaveChangesAsync();
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }
}
