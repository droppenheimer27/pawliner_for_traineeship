using System;

namespace Pawliner.DataProvider
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Order> Orders { get; }
        IRepository<Executor> Executors { get; }
        IRepository<Service> Services { get;  }
        IRepository<ServiceClassifer> ServiceClassifers { get;  }
        IRepository<Document> Documents { get;  }
        void Save();
    }
}
