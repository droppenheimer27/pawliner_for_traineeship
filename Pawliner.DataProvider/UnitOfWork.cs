using System;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext database;
        private OrderRepository orderRepository;

        private bool disposed = false;

        public IRepository<Order> Orders
        {
            get
            {
                if (orderRepository == null)
                {
                    orderRepository = new OrderRepository(database);
                }

                return orderRepository;
            }
        }

        public UnitOfWork(string connectionString)
        {
            database = new ApplicationContext(connectionString);
        }

        public async Task SaveAsync()
        {
            await database.SaveChangesAsync();
        }

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    database.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
