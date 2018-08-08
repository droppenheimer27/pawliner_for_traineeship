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
        public Executor Executor { get; set; }
    }
}
