using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.Repositories;
using sd2376_workshop_backend.Data;
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
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WorkshopContext entities;
        public Dictionary<Type, object> repositories = new Dictionary<Type, object>();
        private bool _isDisposed;

        public UnitOfWork(WorkshopContext _entities)
        {
            this.entities = _entities;
            Tasks = new TaskRepository(_entities);
            Users = new UserRepository(_entities);
            Schedules = new ScheduleRepository(_entities);
            Members = new MemberRepository(_entities);
            Status = new StatusRepository(_entities);
            Roles = new RoleRepository(_entities);
        }

        public ITaskRepository Tasks { get; private set; }
        public IUserRepository Users { get; private set; }
        public IScheduleRepository Schedules { get; private set; }
        public IMemberRepository Members { get; private set; }
        public IStatusRepository Status { get; private set; }
        public IRoleRepository Roles { get; private set; }

        public IGenericRepository<T> Repository<T>() where T : class
        {
            if (repositories.Keys.Contains(typeof(T)) == true)
            {
                return repositories[typeof(T)] as IGenericRepository<T>;
            }

            IGenericRepository<T> repo = new GenericRepository<T>(entities);
            repositories.Add(typeof(T), repo);
            return repo;
        }

        public async Task SaveChanges()
        {
            await entities.SaveChangesAsync();
        }

        public void Dispose()
        {
            if (_isDisposed)
                return;

            _isDisposed = true;
            entities.Dispose();
        }
    }
}
