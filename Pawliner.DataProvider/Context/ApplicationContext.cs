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

        public ApplicationContext() : base("DefaultConnection", throwIfV1Schema: false) // DefaultConnection
        {
        }

        public static ApplicationContext Create()
        {
            return new ApplicationContext();
        }
    }
}
