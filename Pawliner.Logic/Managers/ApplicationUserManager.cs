using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Pawliner.DataProvider;

namespace Pawliner.Logic
{
    public class ApplicationUserManager : UserManager<User>, IApplicationUserManager
    {
        IUnitOfWork database { get; set; }

        public ApplicationUserManager(IUserStore<User> store) : base(store)
        {
            this.database = database;
        }

        public User CreateUser(string UserName, string Email, string PasswordHash = null)
        {
            return new User
            {
                UserName = UserName,
                Email = Email,
                PasswordHash = PasswordHash
            };
        }

        public UserTransport GetUser(int? id)
        {
            if (id == null)
            {
                throw new Exception("User id not found");
            }

            var user = database.Users.Get(id.Value);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            return new UserTransport
            {
                Id = user.Id.ToString(),
                UserName = user.UserName,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                IP = user.UserLastIP
            };
        }

        public static UserContext CreateContext()

        {
            return new UserContext();
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<User>(context.Get<UserContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<User>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = true,
                RequireLowercase = false,
                RequireUppercase = false,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<User>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
