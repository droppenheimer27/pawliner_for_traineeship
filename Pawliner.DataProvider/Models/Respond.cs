using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Respond
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(512, ErrorMessage = "The respond should be less than 512 characters")]
        public string Content { get; set; }
        [Required]
        public string CreatedAt { get; set; }
        [DefaultValue(2)]
        public RespondStatus Status { get; set; }
        public int? OrderId { get; set; }
        public virtual Order Order { get; set; }
        public int? ExecutorId { get; set; }
        public virtual Executor Executor { get; set; }
    }
}
