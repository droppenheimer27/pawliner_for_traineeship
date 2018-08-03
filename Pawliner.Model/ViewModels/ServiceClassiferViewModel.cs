using System.Collections.Generic;

namespace Pawliner.Model
{
    public class ServiceClassiferViewModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public virtual ICollection<OrderViewModel> Orders { get; set; }
        public virtual ICollection<ExecutorViewModel> Executors { get; set; }
    }
}
