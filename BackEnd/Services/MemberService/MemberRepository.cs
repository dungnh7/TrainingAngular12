using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Core.Repositories;
using sd2376_workshop_backend.Data;
using sd2376_workshop_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.MemberService
{
    public class MemberRepository : GenericRepository<Models.Member>, IMemberRepository
    {
        public MemberRepository(WorkshopContext context) : base(context) { }

        public IQueryable<Member> QueryMember()
        {
            return WorkshopContext.Member;
        }

        public WorkshopContext WorkshopContext
        {
            get { return context as WorkshopContext; }
        }
    }
}
