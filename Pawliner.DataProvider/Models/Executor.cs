using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Executor
    {
        [Key]
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
        public DateTime UpdatedAt { get; set; }
        public Document Document { get; set; }
        public NaturalExecutor NaturalExecutor { get; set; }
        public JuridicalExecutor JuridicalExecutor { get; set; }
        public SoleTraderExecutor SoleTraderExecutor { get; set; }
        public ICollection<Service> Services { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public Executor()
        {
            Services = new List<Service>();
            Photos = new List<Photo>();
        }
    }
}
