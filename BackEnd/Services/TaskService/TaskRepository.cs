using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.Repositories;
using sd2376_workshop_backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.TaskService
{
    public class TaskRepository : GenericRepository<Models.Task>, ITaskRepository
    {
        public TaskRepository(WorkshopContext context) : base(context) { }

        public int GetTasksCount(int statusId)
        {
            return WorkshopContext.Task
                .Where(x => x.StatusId == statusId)               
                .Count();
        }

        public async Task<IEnumerable<Models.Task>> GetTasksAsync(int nextIndex, int pageSize, int statusId)
        {
            return await WorkshopContext.Task
                .Where(x=>x.StatusId == statusId)
                .Include(x=>x.Status)
                .Include(x => x.User)
                .Skip((nextIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Models.Task> GetTaskDetailAsync(int Id)
        {
            return await WorkshopContext.Task
                .Where(x => x.Id == Id)
                .Include(x => x.User)
                .Include(x=>x.Status)
                .FirstOrDefaultAsync();
                
        }

        public WorkshopContext WorkshopContext
        {
            get { return context as WorkshopContext; }
        }
    }
}
