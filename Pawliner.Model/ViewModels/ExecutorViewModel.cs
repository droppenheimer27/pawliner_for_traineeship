using System;
using System.Collections.Generic;

namespace Pawliner.Model
{
    public class ExecutorViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Patronymic { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public ExecutorTypeViewModel ExecutorType { get; set; }
        public string Type { get; set; }
        public DocumentViewModel Document { get; set; }
        public NaturalExecutorViewModel NaturalExecutor { get; set; }
        public JuridicalExecutorViewModel JuridicalExecutor { get; set; }
        public SoleTraderExecutorViewModel SoleTraderExecutor { get; set; }
        public ICollection<ServiceClassiferViewModel> ServiceClassifers { get; set; }
        public ICollection<PhotoViewModel> Photos { get; set; }
        public ExecutorViewModel()
        {
            ServiceClassifers = new List<ServiceClassiferViewModel>();
            Photos = new List<PhotoViewModel>();

        }
    }
}
