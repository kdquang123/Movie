using System;
using Microsoft.EntityFrameworkCore.Storage;
using Movie.Data.Repositories;
using Movie.Models;

namespace Movie.Data.UnitOfWorks;

public interface IUnitOfWork : IDisposable
{
    MovieDbContext Context { get; }

    #region Master Data Repositories
    IMasterDataRepository<User> UserRepository { get; }

    IMasterDataRepository<Role> RoleRepository { get; }

    IMasterDataRepository<Category> CategoryRepository { get; }

    IMasterDataRepository<Film> FilmRepository { get; }

    IMasterDataRepository<Product> ProductRepository { get; }

    IMasterDataRepository<Banner> BannerRepository { get; }

    IMasterDataRepository<Room> RoomRepository { get; }

    IMasterDataRepository<News> NewsRepository { get; }

    IMasterDataRepository<Promotion> PromotionRepository { get; }

    IMasterDataRepository<Showtime> ShowTimeRepository { get; }

    IMasterDataRepository<RoomType> RoomTypeRepository { get; }

    IMasterDataRepository<T> MasterDataRepository<T>() where T : MasterBaseEntity, IMasterBaseEntity;

    #endregion

    #region Repositories
    IRepository<Ticket> TicketRepository { get; }

    IRepository<SeatHold> SeatHoldRepository { get; }

    IRepository<Booking> BookingRepository { get; }

    IRepository<Seat> SeatRepository { get; }

    IRepository<AgeRestriction> AgeRestrictionRepository { get; }

    IRepository<FilmReview> FilmReviewRepository { get; }

    IRepository<T> Repository<T>() where T : BaseEntity, IBaseEntity;

    #endregion

    IGenericRepository<BookingDetail> BookingDetailRepository { get; }

    int SaveChanges();

    Task<int> SaveChangesAsync();

    Task<IDbContextTransaction> BeginTransactionAsync();

    Task CommitTransactionAsync();

    Task RollbackTransactionAsync();
}
