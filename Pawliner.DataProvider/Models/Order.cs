using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public DateTime CompletionDate { get; set; }
        public float Price { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
    }
}
