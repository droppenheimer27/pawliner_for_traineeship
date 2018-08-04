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
        public ExecutorTypeTransport ExecutorType { get; set; }
        public string Type { get; set; }
        public DocumentTransport Document { get; set; }
        public NaturalExecutorTransport NaturalExecutor { get; set; }
        public JuridicalExecutorTransport JuridicalExecutor { get; set; }
        public SoleTraderExecutorTransport SoleTraderExecutor { get; set; }
        public ICollection<ServiceClassiferTransport> ServiceClassifers { get; set; }
        public ICollection<PhotoTransport> Photos { get; set; }
        public ExecutorTransport()
        {
            ServiceClassifers = new List<ServiceClassiferTransport>();
            Photos = new List<PhotoTransport>();

        }
    }
}
