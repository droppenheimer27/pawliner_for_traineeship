using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Executor
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int ServiceId { get; set; }
        [ForeignKey("ServiceId")]
        public Service Service { get; set; }
        [Required]
        public string ExecutorType { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string MiddleName { get; set; } // patronymic
        [Required]
        public string LastName { get; set; } 
        [Required]
        public string UNP { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
