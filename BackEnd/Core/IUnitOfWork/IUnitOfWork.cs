using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Services.MemberService;
using sd2376_workshop_backend.Services.RoleService;
using sd2376_workshop_backend.Services.ScheduleService;
using sd2376_workshop_backend.Services.StatusService;
using sd2376_workshop_backend.Services.TaskService;
using sd2376_workshop_backend.Services.UserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Core.IUnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        public ITaskRepository Tasks { get; }
        public IUserRepository Users { get; }
        public IScheduleRepository Schedules { get; }
        public IMemberRepository Members { get; }
        public IStatusRepository Status { get; }
        public IRoleRepository Roles { get; }
        IGenericRepository<T> Repository<T>() where T : class;

        Task SaveChanges();
    }
}
