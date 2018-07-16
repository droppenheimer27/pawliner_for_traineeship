using System.Web.Mvc;
using Pawliner.DataProvider;
using Pawliner.Logic;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Autofac;
using System.Web;
using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity.Owin;
using Autofac.Integration.Mvc;

namespace Pawliner.IoC
{
    public class DependenciesRegistrations
    {
        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(User).Assembly);

            builder.RegisterType<ApplicationContext>().AsSelf().InstancePerRequest().WithParameter("connectionString", "DefaultConnection");
            builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();
            builder.Register(c => new UserStore<User>(c.Resolve<ApplicationContext>())).AsImplementedInterfaces().InstancePerRequest();
            //builder.Register(c => HttpContext.Current.GetOwinContext().Authentication).As<IAuthenticationManager>();
            builder.Register(c => new IdentityFactoryOptions<ApplicationUserManager>
            {
                DataProtectionProvider = new Microsoft.Owin.Security.DataProtection.DpapiDataProtectionProvider("ASP.NET Identity​")
            });

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}
