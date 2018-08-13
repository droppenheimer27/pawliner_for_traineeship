using System;
using System.Collections.Generic;

namespace Pawliner.Model
{
    public class OrderPagebleViewModel
    {
        public IEnumerable<OrderViewModel> items { get; set; }
        public PageInfo _meta { get; set; }
    }
}
