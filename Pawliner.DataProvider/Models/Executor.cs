using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Executor
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public string ExecutorType { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; } // patronymic
        public string LastName { get; set; } 
        public string UNP { get; set; }
        public string Description { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
