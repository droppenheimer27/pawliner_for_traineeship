using System;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Order> Orders { get; }
        Task SaveAsync();
    }
}
