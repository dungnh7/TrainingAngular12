using sd2376_workshop_backend.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.ScheduleService
{
    public interface IScheduleRepository : IGenericRepository<Models.Schedule>
    {
        Task<IEnumerable<Models.Schedule>> GetSchedulesAsync(int nextIndex, int pageSize);
        int GetTasksCount();
    }
}
