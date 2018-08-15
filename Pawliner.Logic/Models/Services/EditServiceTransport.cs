using System.Collections.Generic;

namespace Pawliner.Logic
{
    public class EditServiceTransport
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public List<string> ServiceClassifersDescriptions { get; set; }
    }
}
