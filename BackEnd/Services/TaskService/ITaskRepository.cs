using sd2376_workshop_backend.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.TaskService
{
    public interface ITaskRepository : IGenericRepository<Models.Task>
    {
        int GetTasksCount(int statusId);
        Task<IEnumerable<Models.Task>> GetTasksAsync(int nextIndex, int pageSize, int statusId);

        Task<Models.Task> GetTaskDetailAsync(int Id);
    }
}
