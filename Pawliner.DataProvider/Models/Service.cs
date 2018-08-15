using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Service
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
