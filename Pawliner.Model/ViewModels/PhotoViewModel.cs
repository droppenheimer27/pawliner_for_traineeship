using System;
using System.Collections.Generic;

namespace Pawliner.Model
{
    public class PhotoViewModel
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public string FileName { get; set; }
        public ICollection<UserViewModel> Users { get; set; }
        public ICollection<OrderViewModel> Orders { get; set; }
        public ICollection<ExecutorViewModel> Executors { get; set; }
    }
}
