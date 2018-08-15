using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Pawliner.DataProvider;
using Pawliner.Model;

namespace Pawliner.Logic
{
    public class ApplicationUserManager : UserManager<User>, IApplicationUserManager
    {
        public ApplicationUserManager(IUserStore<User> store, IdentityFactoryOptions<ApplicationUserManager> options) : base(store)
        {
            this.UserValidator = new UserValidator<User>(this)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            this.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };

            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                this.UserTokenProvider = new DataProtectorTokenProvider<User>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
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

        //public static ApplicationContext CreateContext()

        //{
        //    return new ApplicationContext();
        //}

        //public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        //{
        //    var manager = new ApplicationUserManager(new UserStore<User>(context.Get<ApplicationContext>()));
            
        //    manager.UserValidator = new UserValidator<User>(manager)
        //    {
        //        AllowOnlyAlphanumericUserNames = false,
        //        RequireUniqueEmail = true
        //    };
            
        //    manager.PasswordValidator = new PasswordValidator
        //    {
        //        RequiredLength = 6,
        //        RequireNonLetterOrDigit = false,
        //        RequireDigit = true,
        //        RequireLowercase = false,
        //        RequireUppercase = false,
        //    };
        //    var dataProtectionProvider = options.DataProtectionProvider;
        //    if (dataProtectionProvider != null)
        //    {
        //        manager.UserTokenProvider = new DataProtectorTokenProvider<User>(dataProtectionProvider.Create("ASP.NET Identity"));
        //    }
        //    return manager;
        //}
    }
}
