using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Core.IRepositories
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> Query();

        IQueryable<T> GetAll();

        Task<ICollection<T>> GetAllAsync();

        T Get(int id);

        Task<T> GetAsync(int id);

        Task<T> InsertAsync(T t);

        T Update(T t, object key);

        Task<bool> Delete(object id);
    }
}
