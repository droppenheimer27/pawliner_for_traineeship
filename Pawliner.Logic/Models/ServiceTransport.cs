using System.Collections.Generic;

namespace Pawliner.Logic
{
    public class ServiceTransport
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public ICollection<ServiceClassiferTransport> ServiceClassifers { get; set; }
        public ServiceTransport()
        {
            ServiceClassifers = new List<ServiceClassiferTransport>();
        }
    }
}
