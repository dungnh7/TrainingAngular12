using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.Repositories;
using sd2376_workshop_backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.RoleService
{
    public class RoleRepository : GenericRepository<Models.Role>, IRoleRepository
    {
        public RoleRepository(WorkshopContext context) : base(context) { }


        public async Task<IEnumerable<Models.Role>> GetRolesAsync(int nextIndex, int pageSize)
        {
            return await WorkshopContext.Roles
                .Skip((nextIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public int GetTasksCount()
        {
            return WorkshopContext.Roles.Count();
        }

        public WorkshopContext WorkshopContext
        {
            get { return context as WorkshopContext; }
        }
    }
}
