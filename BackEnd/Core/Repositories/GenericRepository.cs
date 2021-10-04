using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Core.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected WorkshopContext context;
        private DbSet<T> entities;

        public GenericRepository(WorkshopContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }       

        public IQueryable<T> Query()
        {
            return entities;
        }

        public IQueryable<T> GetAll()
        {
            return entities;
        }

        public async Task<ICollection<T>> GetAllAsync()
        {
            return await entities.ToListAsync();
        }

        public T Get(int id)
        {
            return entities.Find(id);
        }

        public async Task<T> GetAsync(int id)
        {
            return await entities.FindAsync(id);
        }

        public async Task<T> InsertAsync(T t)
        {
           await entities.AddAsync(t);
            return t;
        }

        public T Update(T t, object key)
        {
            if (t == null)
                return null;
            T exist = entities.Find(key);
            if (exist != null)
            {
                context.Entry(exist).CurrentValues.SetValues(t);
            }
            return exist;
        }

        public async Task<bool> Delete(object id)
        {
            var exist = await entities.FindAsync(id);

            if (exist == null) return false;

            entities.Remove(exist);

            return true;
        }
    }
}
