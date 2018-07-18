using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class Service
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int ServiceClassiferId { get; set; }
        public string Description { get; set; }
    }
}
