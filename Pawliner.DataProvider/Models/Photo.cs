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
        [Required]
        public string Path { get; set; }
        [Required]
        public string FileName { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Executor> Executors { get; set; }

        public Photo()
        {
            Users = new List<User>();
            Orders = new List<Order>();
            Executors = new List<Executor>();
        }
    }
}
