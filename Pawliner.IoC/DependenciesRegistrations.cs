using Ninject;
using Ninject.Modules;
using Ninject.Web.Mvc;
using System.Web.Mvc;
using Pawliner.DataProvider;
using Pawliner.Logic;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Pawliner.IoC
{
    public class DependenciesRegistrations : NinjectModule
    {
        private string connectionString;

        public DependenciesRegistrations(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public override void Load()
        {
            Bind<IUnitOfWork>().To<UnitOfWork>();
            Bind<IUserStore<User>>().To<UserStore<User>>();
            Bind<IApplicationUserManager>().To<ApplicationUserManager>();
        }
    }
}
