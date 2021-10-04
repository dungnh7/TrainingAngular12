using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.Repositories;
using sd2376_workshop_backend.Data;
using sd2376_workshop_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.UserService
{
    public class UserRepository : GenericRepository<Models.User>, IUserRepository
    {
        public UserRepository(WorkshopContext context) : base(context) { }


        public async Task<IEnumerable<Models.User>> GetUsersAsync(int nextIndex, int pageSize)
        {
            return await WorkshopContext.User
                .Include(x => x.Schedules)
                .Include(x => x.Tasks)
                .Skip((nextIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public int GetUsersCount()
        {
            return WorkshopContext.User.Count();
        }

        public async Task<IEnumerable<User>> GetUserScheduleAsync(int userId)
        {
            return await WorkshopContext.User
                .Where(x => x.Id == userId)
                 .Include(x => x.Schedules)
                 .ToListAsync();
        }

        public WorkshopContext WorkshopContext
        {
            get { return context as WorkshopContext; }
        }
    }
}
