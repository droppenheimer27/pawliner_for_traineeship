using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Pawliner.DataProvider;
using Pawliner.IoC;
using Pawliner.Logic;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Pawliner
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            ConfigureContainer();
            // Web API configuration and services
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterControllers(Assembly.GetExecutingAssembly());

            builder.RegisterWebApiFilterProvider(config);

            builder.RegisterWebApiModelBinderProvider();

            builder.RegisterType<ApplicationContext>().AsSelf().InstancePerRequest().WithParameter("connectionString", "DefaultConnection");
            builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();
            builder.Register(c => new UserStore<User>(c.Resolve<ApplicationContext>())).AsImplementedInterfaces().InstancePerRequest();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerRequest();
            builder.RegisterType<OrderManager>().AsSelf().InstancePerRequest();

            //builder.RegisterType<UserStore<User>>().As<IUserStore<User>>().InstancePerLifetimeScope();
            //builder.RegisterType<RoleStore<IdentityRole>>().As<IRoleStore<IdentityRole, string>>().InstancePerLifetimeScope();
            //builder.Register(c => HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>()).As<ApplicationUserManager>().InstancePerLifetimeScope();
            //builder.Register(c => new UserStore<User>(c.Resolve<ApplicationContext>())).AsImplementedInterfaces().InstancePerRequest();
            //builder.Register(c => HttpContext.Current.GetOwinContext().Authentication).As<IAuthenticationManager>();
            builder.Register(c => new IdentityFactoryOptions<ApplicationUserManager>
            {
                DataProtectionProvider = new Microsoft.Owin.Security.DataProtection.DpapiDataProtectionProvider("ASP.NET Identity​")
            });

            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}
