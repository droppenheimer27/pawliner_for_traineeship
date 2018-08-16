using Pawliner.DataProvider;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.Logic
{
    public class ExecutorTransport
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Patronymic { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public ExecutorStatusTransport Status { get; set; }
        public ExecutorTypeTransport ExecutorType { get; set; }
        [NotMapped]
        public string Type { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public DocumentTransport Document { get; set; }
        public NaturalExecutorTransport NaturalExecutor { get; set; }
        public JuridicalExecutorTransport JuridicalExecutor { get; set; }
        public SoleTraderExecutorTransport SoleTraderExecutor { get; set; }
        public ICollection<ServiceClassiferTransport> ServiceClassifers { get; set; }
        public List<string> ServiceClassifersIds { get; set; }
        public int PayerAccountNumber { get; set; }
        public string FullJuredicalName { get; set; }
        public string ShortJuredicalName { get; set; }
        public List<Photo> Photos { get; set; }
        public ICollection<RespondTransport> Responds { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
