using System.Collections.Generic;

namespace Pawliner.Logic
{
    class ServiceWithOrdersAndExecutorsTransport
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public ICollection<ServiceClassiferTransport> ServiceClassifers { get; set; }
        public ICollection<OrderTransport> Orders { get; set; }
        public ICollection<ExecutorTransport> Executors { get; set; }
    }
}
