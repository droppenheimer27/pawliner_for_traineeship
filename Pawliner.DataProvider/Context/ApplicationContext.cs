using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Pawliner.DataProvider
{ 
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<Executor> Executors { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<ServiceClassifer> ServiceClassifers { get; set; }
        public DbSet<Document> Documents { get; set; }
       // public DbSet<User> Users { get; set; }

        public ApplicationContext() : base() 
        { }

        public ApplicationContext(string connectionString) : base(connectionString, throwIfV1Schema: false) // DefaultConnection
        { }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
