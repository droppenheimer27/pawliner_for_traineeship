using Ninject;
using Ninject.Modules;
using Ninject.Web.Mvc;
using System.Web.Mvc;
using Pawliner.DataProvider;
using Pawliner.Logic;

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
            Bind<IUnitOfWork>().To<UnitOfWork>().WithConstructorArgument(connectionString);
            Bind<IUserManager>().To<UserManager>();
        }
    }
}
