using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Movie.Models;
using Movie.Models.Models;

namespace Movie.Data;

public class MovieDbContext : IdentityDbContext<User, Role, Guid>
{
    public DbSet<Film> Films { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<Banner> Banners { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<AgeRestriction> AgeRestrictions { get; set; }
    public DbSet<FilmReview> FilmReviews { get; set; }
    public DbSet<BookingDetail> BookingDetails { get; set; }
    public DbSet<SeatHold> SeatHolds { get; set; }
    public DbSet<Showtime> Showtimes { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<News> News { get; set; }
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<RoomType> RoomTypes { get; set; }
    public DbSet<Seat> Seats { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    public DbSet<FilmCategory> FilmCategories { get; set; }

    public MovieDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Rename Identity tables
        builder.Entity<User>().ToTable("Users");
        builder.Entity<Role>().ToTable("Roles");
        builder.Entity<IdentityUserRole<Guid>>().ToTable("UserRoles");
        builder.Entity<IdentityUserClaim<Guid>>().ToTable("UserClaims");
        builder.Entity<IdentityUserLogin<Guid>>().ToTable("UserLogins");
        builder.Entity<IdentityRoleClaim<Guid>>().ToTable("RoleClaims");
        builder.Entity<IdentityUserToken<Guid>>().ToTable("UserTokens");

        builder.Entity<BookingDetail>()
            .HasKey(bd => new { bd.BookingId, bd.ProductId });

        builder.Entity<FilmCategory>()
           .HasKey(fc => new { fc.FilmId, fc.CategoryId });

        builder.Entity<Booking>()
            .Property(b => b.BookingStatus)
            .HasConversion<string>();

        builder.Entity<Banner>()
            .Property(b => b.BannerType)
            .HasConversion<string>();

        builder.Entity<Promotion>()
            .Property(p => p.DiscountType)
            .HasConversion<string>();

        builder.Entity<Seat>()
            .Property(s => s.Type)
            .HasConversion<string>();

        builder.Entity<RefreshToken>()
            .HasOne(r => r.User)
            .WithMany()
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Booking>()
            .HasMany(b => b.BookingDetails)
            .WithOne(bd => bd.Booking)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Ticket>()
            .HasOne(t => t.Booking)
            .WithMany(b => b.Tickets)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Seat>()
            .HasOne(s => s.Room)
            .WithMany(r => r.Seats)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Ticket>()
           .HasOne(t => t.Seat)
           .WithMany(s => s.Tickets)
           .HasForeignKey(t => t.SeatId)
           .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Booking>()
            .Property(b => b.TotalPrice)
            .HasColumnType("decimal(18,0)");

        builder.Entity<BookingDetail>()
            .Property(bd => bd.ProductPrice)
            .HasColumnType("decimal(18,0)");

        builder.Entity<Product>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,0)");

        builder.Entity<Promotion>()
            .Property(p => p.DiscountValue)
            .HasColumnType("decimal(18,0)");

        builder.Entity<Promotion>()
            .Property(p => p.MinOrderAmount)
            .HasColumnType("decimal(18,0)");

        builder.Entity<RoomType>()
            .Property(rt => rt.ExtraPrice)
            .HasColumnType("decimal(18,0)");

        builder.Entity<Showtime>()
            .Property(s => s.BasePrice)
            .HasColumnType("decimal(18,0)");

        builder.Entity<Showtime>()
            .Property(s => s.WeekendPrice)
            .HasColumnType("decimal(18,0)");
    }
}
