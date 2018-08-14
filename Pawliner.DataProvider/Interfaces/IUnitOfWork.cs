using System;

namespace Pawliner.DataProvider
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository<User> Users { get; }
        IRepository<Order> Orders { get; }
        IRepository<Executor> Executors { get; }
        IRepository<NaturalExecutor> NaturalExecutors { get; }
        IRepository<SoleTraderExecutor> SoleTraderExecutors { get; }
        IRepository<JuridicalExecutor> JuridicalExecutors { get; }
        IRepository<Respond> Responds { get; }
        IRepository<Service> Services { get;  }
        IRepository<ServiceClassifer> ServiceClassifers { get;  }
        IRepository<Document> Documents { get;  }
        IPhotoRepository<Photo> Photos { get; }
        IRepository<Comment> Comments { get; }
        IRepository<ExceptionDetail> ExceptionDetails { get; }
        void Save();
    }
}
