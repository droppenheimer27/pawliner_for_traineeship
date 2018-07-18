using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Document
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public byte[] Picture { get; set; }
    }
}
