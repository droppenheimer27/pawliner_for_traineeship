using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    public class ServiceClassifer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int ParentId { get; set; }
        public string Description { get; set; }
        public Service Service { get; set; }
    }
}
