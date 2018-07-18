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
using Autofac.Integration.WebApi;
using System.Reflection;
using System.Web.Http;


namespace Pawliner.IoC
{

    public class DependenciesRegistrations
    {
        public static IContainer ConfigureContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<ApplicationContext>().AsSelf().InstancePerRequest().WithParameter("connectionString", "DefaultConnection");
            builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();
            //-----------------
            builder.Register(c => new UnitOfWork(c.Resolve<ApplicationContext>())).As<IUnitOfWork>().InstancePerRequest();
            builder.Register(c => new OrderManager(c.Resolve<UnitOfWork>())).As<IOrderManager>().InstancePerRequest();

            //builder.Register(c => new UnitOfWork(c.Resolve<ApplicationContext>())).AsImplementedInterfaces().InstancePerRequest();
            //builder.RegisterType<OrderManager>().AsSelf().InstancePerRequest();

            //-----------------
            builder.Register(c => HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>()).As<ApplicationUserManager>().InstancePerLifetimeScope();
            builder.RegisterType<UserStore<User>>().As<IUserStore<User>>().InstancePerLifetimeScope();
            builder.Register(c => new UserStore<User>(c.Resolve<ApplicationContext>())).AsImplementedInterfaces().InstancePerRequest();
            builder.RegisterType<RoleStore<IdentityRole>>().As<IRoleStore<IdentityRole, string>>().InstancePerLifetimeScope();
            builder.Register(c => HttpContext.Current.GetOwinContext().Authentication).As<IAuthenticationManager>();

            builder.Register(c => new IdentityFactoryOptions<ApplicationUserManager>
            {
                DataProtectionProvider = new Microsoft.Owin.Security.DataProtection.DpapiDataProtectionProvider("ASP.NET Identity​")
            });

            var container = builder.Build();

            return container;
        }
    }
}
