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
        public DbSet<NaturalExecutor> NaturalExecutors { get; set; }
        public DbSet<SoleTraderExecutor> SoleTraderExecutors { get; set; }
        public DbSet<JuridicalExecutor> JuridicalExecutors { get; set; }
        public DbSet<Respond> Responds { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<ServiceClassifer> ServiceClassifers { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<ExceptionDetail> ExceptionDetails { get; set; }

        public ApplicationContext() : base() 
        { }

        public ApplicationContext(string connectionString) : base(connectionString, throwIfV1Schema: false) // DefaultConnection
        { }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasMany(p => p.Responds)
                .WithRequired(p => p.Order)
                .WillCascadeOnDelete(true);

            modelBuilder.Entity<Executor>()
                .HasMany(p => p.Responds)
                .WithRequired(p => p.Executor)
                .WillCascadeOnDelete(true);

            modelBuilder.Entity<Executor>()
                .HasMany(p => p.Comments)
                .WithRequired(p => p.Executor)
                .WillCascadeOnDelete(true);


            modelBuilder.Entity<Service>()
                .HasMany(p => p.ServiceClassifers)
                .WithRequired(p => p.Service)
                .WillCascadeOnDelete(true);


            base.OnModelCreating(modelBuilder);
        }
    }
}
