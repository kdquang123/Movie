using System;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Movie.Models;

namespace Movie.Data.Repositories;

public class Repository<T> : GenericRepository<T>, IRepository<T>
        where T : class, IBaseEntity
{
    #region Constructor

    public Repository(MovieDbContext dataContext) : base(dataContext)
    {
    }

    #endregion

    #region Overwrite Methods

    public override void Add(T entity)
    {
        if (entity.Id == Guid.Empty) entity.Id = Guid.NewGuid();
        entity.CreatedAt = DateTime.UtcNow;
        DbSet.Add(entity);
    }

    public override void Update(T entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        UpdateEntityObject(entity);
    }

    public override void Delete(T entity, bool isHardDelete = false)
    {
        if (isHardDelete)
        {
            DbSet.Remove(entity);
        }
        else
        {
            entity.DeletedAt = DateTime.UtcNow;
            entity.IsDelete = true;
            UpdateEntityObject(entity);
        }
    }

    public override void Delete(Expression<Func<T, bool>> where, bool isHardDelete = false)
    {
        var entities = GetQuery(where).AsEnumerable();
        foreach (var entity in entities)
        {
            Delete(entity, isHardDelete);
        }
    }

    public IQueryable<T> GetQueryById(Guid id)
    {
        return GetQuery(m => m.Id == id);
    }

    public Task<TResult?> GetPropertyById<TResult>(Guid id,
        Expression<Func<T, TResult>> selector)
    {
        return GetQueryById(id).Select(selector).FirstOrDefaultAsync();
    }

    public IQueryable<T> GetQueryWithDeleted()
    {
        return GetQuery().Where(x => x.IsDelete || x.IsDelete == false);
    }

    public T? Refresh(T entity)
    {
        DataContext.Entry(entity).State = EntityState.Detached;
        return GetById(entity.Id);
    }

    #endregion

    #region Private Methods

    private void UpdateEntityObject(T entity)
    {
        DbSet.Attach(entity);
        entity.UpdatedAt = DateTime.UtcNow;
        DataContext.Entry(entity).State = EntityState.Modified;
        DataContext.Entry(entity).GetDatabaseValues()?.ToObject();
    }
    #endregion
}
