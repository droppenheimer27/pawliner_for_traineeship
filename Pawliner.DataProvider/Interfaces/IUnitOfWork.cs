using System;

namespace Pawliner.DataProvider
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User> Users { get; }
        void Save();
    }
}
