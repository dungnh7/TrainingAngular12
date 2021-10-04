using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.Models
{
    public class User 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Position { get; set; }
        public virtual ICollection<Schedule> Schedules { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
