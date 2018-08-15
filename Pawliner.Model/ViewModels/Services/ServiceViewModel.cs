using System.Collections.Generic;

namespace Pawliner.Model
{
    public class ServiceViewModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public ICollection<ServiceClassiferViewModel> ServiceClassifers { get; set; }

    }
}
