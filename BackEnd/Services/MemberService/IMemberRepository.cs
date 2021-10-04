using sd2376_workshop_backend.Core.IRepositories;
using sd2376_workshop_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Services.MemberService
{
    public interface IMemberRepository : IGenericRepository<Models.Member>
    {
        IQueryable<Member> QueryMember();
    }
}
