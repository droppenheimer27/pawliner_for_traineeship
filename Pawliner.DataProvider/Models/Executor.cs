using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Executor
    {
        [Key]
        //[ForeignKey("User")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Patronymic { get; set; }
        [Required]
        public string LastName { get; set; } 
        [Required]
        public string Description { get; set; }
        public ExecutorType ExecutorType { get; set; }
        [NotMapped]
        public string Type { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public Document Document { get; set; }
        public NaturalExecutor NaturalExecutor { get; set; }
        public JuridicalExecutor JuridicalExecutor { get; set; }
        public SoleTraderExecutor SoleTraderExecutor { get; set; }
        [NotMapped]
        public List<string> ServiceClassifersIds { get; set; }
        [NotMapped]
        public int PayerAccountNumber { get; set; }
        [NotMapped]
        public string FullJuredicalName { get; set; }
        [NotMapped]
        public string ShortJuredicalName { get; set; }
        public ICollection<ServiceClassifer> ServiceClassifers { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Respond> Responds { get; set; }
        public Executor()
        {
            ServiceClassifers = new List<ServiceClassifer>();
            Photos = new List<Photo>();
            Responds = new List<Respond>();
        }
    }
}
