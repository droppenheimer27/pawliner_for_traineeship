using System;
using System.Collections.Generic;

namespace Pawliner.Model
{
    public class PhotoViewModel
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public ICollection<OrderViewModel> Orders { get; set; }
        public ICollection<ExecutorViewModel> Executors { get; set; }

        public PhotoViewModel()
        {
            Orders = new List<OrderViewModel>();
            Executors = new List<ExecutorViewModel>();
        }
    }
}
