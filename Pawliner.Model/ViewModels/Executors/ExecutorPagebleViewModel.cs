using System;
using System.Collections.Generic;

namespace Pawliner.Model
{
    public class ExecutorPagebleViewModel
    {
        public IEnumerable<ExecutorViewModel> items { get; set; }
        public PageInfo _meta { get; set; }
    }
}
