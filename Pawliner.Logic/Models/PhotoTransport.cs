using Pawliner.DataProvider;
using System;
using System.Collections.Generic;

namespace Pawliner.Logic
{
    public class PhotoTransport
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public string FileName { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<OrderTransport> Orders { get; set; }
        public ICollection<ExecutorTransport> Executors { get; set; }
    }
}
