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
        public ExecutorTypeViewModel Type { get; set; }
        public ICollection<ServiceClassiferViewModel> ServiceClassiferViewModels { get; set; }
    }
}
