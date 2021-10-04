using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Models
{
    public class MemberRole : IdentityUserRole<int>
    {
        public Member Member { get; set; }

        public Role Role { get; set; }

    }
}
