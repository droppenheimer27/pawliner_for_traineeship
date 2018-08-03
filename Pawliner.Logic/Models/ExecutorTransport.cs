using System;
using System.Collections.Generic;

namespace Pawliner.Logic
{
    public class ExecutorTransport
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Patronymic { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public ExecutorTypeTransport Type { get; set; }
        public ICollection<ServiceClassiferTransport> ServiceClassiferTransports { get; set; }
    }
}
