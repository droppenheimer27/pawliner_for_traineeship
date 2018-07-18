using System;

namespace Pawliner.Model
{
    public class OrderViewModel
    {
        public string UserId { get; set; }
        public int ServiceId { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public int Price { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CompletedOn { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
