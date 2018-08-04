using System;

namespace Pawliner.DataProvider
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Order> Orders { get; }
        IRepository<Executor> Executors { get; }
        IRepository<NaturalExecutor> NaturalExecutors { get; }
        IRepository<SoleTraderExecutor> SoleTraderExecutors { get; }
        IRepository<JuridicalExecutor> JuridicalExecutors { get; }
        IRepository<Service> Services { get;  }
        IRepository<ServiceClassifer> ServiceClassifers { get;  }
        IRepository<Document> Documents { get;  }
        void Save();
    }
}
