using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Document
    {
        [Key]
        [ForeignKey("Executor")]
        public int Id { get; set; }
        public string Path { get; set; }
        public string FileName { get; set; }
        public virtual Executor Executor { get; set; }
    }
}
