using sd2376_workshop_backend.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.RoleService
{
    public interface IRoleRepository : IGenericRepository<Models.Role>
    {
        Task<IEnumerable<Models.Role>> GetRolesAsync(int nextIndex, int pageSize);
        int GetTasksCount();
    }
}
