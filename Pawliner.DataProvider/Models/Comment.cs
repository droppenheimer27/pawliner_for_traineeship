using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(512, ErrorMessage = "Comment cannot be more than 512 characters")]
        public string Content { get; set; }
        [Required]
        public string CreatedAt { get; set; }
        [Required]
        public string UserId { get; set; }
        public virtual User User { get; set; }
        [Required]
        public int? ExecutorId { get; set; }
        public virtual Executor Executor { get; set; }
    }
}
