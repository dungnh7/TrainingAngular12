using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Models
{
    public class Role : IdentityRole<int>
    {
        public IList<MemberRole> Users { get; set; } = new List<MemberRole>();
    }
}
