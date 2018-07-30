using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public int ServiceId { get; set; }
        [Required]
        [MaxLength(128, ErrorMessage = "The header should be less than 128 characters")]
        public string Header { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string City { get; set; }
        public string Address { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        [MaxLength(32, ErrorMessage = "The name should be less than 32 characters")]
        public string Name { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string CompletedOn { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }
}
