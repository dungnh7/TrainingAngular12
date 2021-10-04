using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Models
{
    public class Member : IdentityUser<int>
    {
        public string Name { get; set; }

        public bool IsActive { get; set; }

        public IList<MemberRole> Roles { get; set; } = new List<MemberRole>();
    }
}
