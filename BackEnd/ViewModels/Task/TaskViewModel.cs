﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sd2376_workshop_backend.ViewModels.Task
{
    public class TaskViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string StatusId { get; set; }
        public string UserId { get; set; }
    }
}
