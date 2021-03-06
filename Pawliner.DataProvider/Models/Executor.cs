﻿using System;
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
        [MaxLength(128)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(128)]
        public string Patronymic { get; set; }
        [Required]
        [MaxLength(128)]
        public string LastName { get; set; } 
        [Required]
        public string Description { get; set; }
        [MaxLength(32)]
        public string PhoneNumber { get; set; }
        public ExecutorStatus Status { get; set; }
        public ExecutorType ExecutorType { get; set; }
        [NotMapped]
        public string Type { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public virtual Document Document { get; set; }
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
        public ICollection<Comment> Comments { get; set; }
        public Executor()
        {
            ServiceClassifers = new List<ServiceClassifer>();
            Photos = new List<Photo>();
            Responds = new List<Respond>();
            Comments = new List<Comment>();
        }
    }
}
