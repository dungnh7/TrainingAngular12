using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.Repositories;
using sd2376_workshop_backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.StatusService
{
    public class StatusRepository : GenericRepository<Models.Status>, IStatusRepository
    {
        public StatusRepository(WorkshopContext context) : base(context) { }



        public WorkshopContext WorkshopContext
        {
            get { return context as WorkshopContext; }
        }
    }
}
