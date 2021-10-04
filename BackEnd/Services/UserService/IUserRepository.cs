using sd2376_workshop_backend.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.UserService
{
    public interface IUserRepository : IGenericRepository<Models.User>
    {
        Task<IEnumerable<Models.User>> GetUsersAsync(int nextIndex, int pageSize);
        Task<IEnumerable<Models.User>> GetUserScheduleAsync(int userId);
        int GetUsersCount();
    }
}
