using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Document
    {
        [Key]
        [ForeignKey("Executor")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public byte[] Picture { get; set; }
        public Executor Executor { get; set; }
    }
}
