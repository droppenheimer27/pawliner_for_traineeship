using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Pawliner.DataProvider
{
    public class Service
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
        public ICollection<ServiceClassifer> ServiceClassifers { get; set; }
        public Service()
        {
            ServiceClassifers = new List<ServiceClassifer>();
        }
    }
}
