using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Pawliner.DataProvider
{ 
    public class UserContext : IdentityDbContext<User>
    {

        public UserContext() : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static UserContext Create()
        {
            return new UserContext();
        }
    }
}
