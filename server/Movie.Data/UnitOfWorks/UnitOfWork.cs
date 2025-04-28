using System;
using Microsoft.EntityFrameworkCore.Storage;
using Movie.Data.Repositories;
using Movie.Models;

namespace Movie.Data.UnitOfWorks;

public class UnitOfWork : IUnitOfWork
{
    private readonly MovieDbContext _context;

    private bool _disposed = false;

    public UnitOfWork(MovieDbContext context)
    {
        _context = context;
    }

    public MovieDbContext Context => _context;

    private IMasterDataRepository<User>? _userRepository;
    public IMasterDataRepository<User> UserRepository => _userRepository ??= new MasterDataRepository<User>(_context);

    private IMasterDataRepository<Role>? _roleRepository;
    public IMasterDataRepository<Role> RoleRepository => _roleRepository ??= new MasterDataRepository<Role>(_context);

    private IMasterDataRepository<Category>? _categoryRepository;
    public IMasterDataRepository<Category> CategoryRepository => _categoryRepository ??= new MasterDataRepository<Category>(_context);

    private IMasterDataRepository<Film>? _filmRepository;
    public IMasterDataRepository<Film> FilmRepository => _filmRepository ??= new MasterDataRepository<Film>(_context);

    private IMasterDataRepository<Product>? _productRepository;
    public IMasterDataRepository<Product> ProductRepository => _productRepository ??= new MasterDataRepository<Product>(_context);

    private IMasterDataRepository<Banner>? _bannerRepository;
    public IMasterDataRepository<Banner> BannerRepository => _bannerRepository ??= new MasterDataRepository<Banner>(_context);

    private IMasterDataRepository<Room>? _roomRepository;
    public IMasterDataRepository<Room> RoomRepository => _roomRepository ??= new MasterDataRepository<Room>(_context);

    private IMasterDataRepository<News>? _newsRepository;
    public IMasterDataRepository<News> NewsRepository => _newsRepository ??= new MasterDataRepository<News>(_context);

    private IMasterDataRepository<Promotion>? _promotionRepository;
    public IMasterDataRepository<Promotion> PromotionRepository => _promotionRepository ??= new MasterDataRepository<Promotion>(_context);

    private IMasterDataRepository<Showtime>? _showtimeRepository;
    public IMasterDataRepository<Showtime> ShowTimeRepository => _showtimeRepository ??= new MasterDataRepository<Showtime>(_context);

    private IMasterDataRepository<RoomType>? _roomTypeRepository;
    public IMasterDataRepository<RoomType> RoomTypeRepository => _roomTypeRepository ??= new MasterDataRepository<RoomType>(_context);

    private IRepository<Ticket>? _ticketRepository;
    public IRepository<Ticket> TicketRepository => _ticketRepository ??= new Repository<Ticket>(_context);

    private IRepository<SeatHold>? _seatHoldRepository;
    public IRepository<SeatHold> SeatHoldRepository => _seatHoldRepository ??= new Repository<SeatHold>(_context);

    private IRepository<Booking>? _bookingRepository;
    public IRepository<Booking> BookingRepository => _bookingRepository ??= new Repository<Booking>(_context);

    private IRepository<Seat>? _seatRepository;
    public IRepository<Seat> SeatRepository => _seatRepository ??= new Repository<Seat>(_context);

    private IRepository<AgeRestriction>? _ageRestrictionRepository;
    public IRepository<AgeRestriction> AgeRestrictionRepository => _ageRestrictionRepository ??= new Repository<AgeRestriction>(_context);

    private IRepository<FilmReview>? _filmReviewRepository;
    public IRepository<FilmReview> FilmReviewRepository => _filmReviewRepository ??= new Repository<FilmReview>(_context);

    private IGenericRepository<BookingDetail>? _bookingDetailRepository;
    public IGenericRepository<BookingDetail> BookingDetailRepository => _bookingDetailRepository ??= new GenericRepository<BookingDetail>(_context);

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            _disposed = true;
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    ~UnitOfWork()
    {
        Dispose(false);
    }

    public int SaveChanges()
    {
        return _context.SaveChanges();
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitTransactionAsync()
    {
        await _context.Database.CommitTransactionAsync();
    }

    public async Task RollbackTransactionAsync()
    {
        await _context.Database.RollbackTransactionAsync();
    }

    public IMasterDataRepository<T> MasterDataRepository<T>() where T : MasterBaseEntity, IMasterBaseEntity
    {
        return new MasterDataRepository<T>(_context);
    }

    public IRepository<T> Repository<T>() where T : BaseEntity, IBaseEntity
    {
        return new Repository<T>(_context);
    }
}
