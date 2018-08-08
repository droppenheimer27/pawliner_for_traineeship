using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class SoleTraderExecutor
    {
        [Key]
        [ForeignKey("Executor")]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int PayerAccountNumber { get; set; } 
        public Executor Executor { get; set; }
    }
}
