using System;
using System.Linq.Expressions;
using Movie.Models;

namespace Movie.Data.Repositories;

public class MasterDataRepository<T> : Repository<T>, IMasterDataRepository<T>
        where T : class, IMasterBaseEntity
{

    #region Constructor
    public MasterDataRepository(MovieDbContext dataContext) : base(dataContext)
    {
    }
    #endregion

    public virtual IEnumerable<T> GetAllWithInactive()
    {
        return GetQuery(true).ToList();
    }

    public virtual IEnumerable<T> GetManyWithInactive(Expression<Func<T, bool>> where)
    {
        return GetQuery(true).Where(where).ToList();
    }

    public IQueryable<T> GetQuery(bool includeInactive = false)
    {
        var query = base.GetQuery();
        if (includeInactive)
        {
            return query;
        }

        return query.Where(m => m.IsActive);
    }

    public new IQueryable<T> GetQuery(Expression<Func<T, bool>> where)
    {
        return GetQuery().Where(where);
    }

    public IQueryable<T> GetQueryWithInactive(Expression<Func<T, bool>> where)
    {
        return GetQuery(true).Where(where);
    }

    public IEnumerable<T> GetMany(Expression<Func<T, bool>> where)
    {
        return GetQuery().Where(where).ToList();
    }
}

