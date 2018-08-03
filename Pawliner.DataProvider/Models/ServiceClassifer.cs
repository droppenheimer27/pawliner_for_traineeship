using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class ServiceClassifer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Description { get; set; }
        public Service Service { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Executor> Executors { get; set; }

        public ServiceClassifer()
        {
            Orders = new List<Order>();
            Executors = new List<Executor>();
        }
    }
}
