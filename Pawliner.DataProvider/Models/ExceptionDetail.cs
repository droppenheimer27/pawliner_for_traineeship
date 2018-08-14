using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class ExceptionDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string ExceptionMessage { get; set; }
        [Required]
        public string ControllerName { get; set; }
        [Required]
        public string StackTrace { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
