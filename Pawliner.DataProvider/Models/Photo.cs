using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Photo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public byte[] Picture { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Executor> Executors { get; set; }

        public Photo()
        {
            Orders = new List<Order>();
            Executors = new List<Executor>();
        }
    }
}
