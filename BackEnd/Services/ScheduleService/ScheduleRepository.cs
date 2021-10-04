using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.Repositories;
using sd2376_workshop_backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.ScheduleService
{
    public class ScheduleRepository : GenericRepository<Models.Schedule>, IScheduleRepository
    {
        public ScheduleRepository(WorkshopContext context) : base(context) { }


        public async Task<IEnumerable<Models.Schedule>> GetSchedulesAsync(int nextIndex, int pageSize)
        {
            return await WorkshopContext.Schedule
                .Include(x=>x.User)
                .Skip((nextIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public int GetTasksCount()
        {
            return WorkshopContext.Schedule.Count();
        }

        public WorkshopContext WorkshopContext
        {
            get { return context as WorkshopContext; }
        }
    }
}
