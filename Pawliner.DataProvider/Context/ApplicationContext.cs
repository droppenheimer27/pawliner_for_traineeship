using System.Data.Entity;

namespace Pawliner.DataProvider
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public ApplicationContext(string connectionString) : base(connectionString)
        { }
    }
}
