using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.Model
{
    public class ExecutorViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Patronymic { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public ExecutorStatusViewModel Status { get; set; }
        public ExecutorTypeViewModel ExecutorType { get; set; }
        public string Type { get; set; }
        public string UserId { get; set; }
        public virtual UserViewModel User { get; set; }
        public DocumentViewModel Document { get; set; }
        public NaturalExecutorViewModel NaturalExecutor { get; set; }
        public JuridicalExecutorViewModel JuridicalExecutor { get; set; }
        public SoleTraderExecutorViewModel SoleTraderExecutor { get; set; }
        public List<string> ServiceClassifersIds { get; set; }
        public int PayerAccountNumber { get; set; }
        public string FullJuredicalName { get; set; }
        public string ShortJuredicalName { get; set; }
        public ICollection<PhotoViewModel> Photos { get; set; }
        public ICollection<RespondViewModel> Responds { get; set; }
        public ICollection<CommentViewModel> Comments { get; set; }
        public virtual ICollection<ServiceClassiferViewModel> ServiceClassifers { get; set; }
        public ExecutorViewModel()
        {
            Photos = new List<PhotoViewModel>();
        }
    }
}
