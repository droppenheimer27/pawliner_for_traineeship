using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class JuridicalExecutor
    {
        [Key]
        [ForeignKey("Executor")]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FullJuredicalName { get; set; }
        public string ShortJuredicalName { get; set; }
        public int PayerAccountNumber { get; set; }
        public Executor Executor { get; set; }
    }
}
