using System;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext database;
        private UserRepository userRepository;
        private OrderRepository orderRepository;
        private ExecutorRepository executorRepository;
        private NaturalExecutorRepository naturalExecutorRepository;
        private SoleTraderExecutorRepository soleTraderExecutorRepository;
        private JuridicalExecutorRepository juridicalExecutorRepository;
        private RespondRepository respondRepository;
        private ServiceRepository serviceRepository;
        private ServiceClassiferRepository serviceClassiferRepository;
        private DocumentRepository documentRepository;

        private bool disposed = false;

        public IUserRepository<User> Users
        {
            get
            {
                if (userRepository == null)
                {
                    userRepository = new UserRepository(database);
                }

                return userRepository;
            }
        }

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

        public IRepository<Executor> Executors
        {
            get
            {
                if (executorRepository == null)
                {
                    executorRepository = new ExecutorRepository(database);
                }

                return executorRepository;
            }
        }

        public IRepository<NaturalExecutor> NaturalExecutors
        {
            get
            {
                if (naturalExecutorRepository == null)
                {
                    naturalExecutorRepository = new NaturalExecutorRepository(database);
                }

                return naturalExecutorRepository;
            }
        }

        public IRepository<SoleTraderExecutor> SoleTraderExecutors
        {
            get
            {
                if (soleTraderExecutorRepository == null)
                {
                    soleTraderExecutorRepository = new SoleTraderExecutorRepository(database);
                }

                return soleTraderExecutorRepository;
            }
        }

        public IRepository<JuridicalExecutor> JuridicalExecutors
        {
            get
            {
                if (juridicalExecutorRepository == null)
                {
                    juridicalExecutorRepository = new JuridicalExecutorRepository(database);
                }

                return juridicalExecutorRepository;
            }
        }

        public IRepository<Respond> Responds
        {
            get
            {
                if (respondRepository == null)
                {
                    respondRepository = new RespondRepository(database);
                }

                return respondRepository;
            }
        }

        public IRepository<Service> Services
        {
            get
            {
                if (serviceRepository == null)
                {
                    serviceRepository = new ServiceRepository(database);
                }

                return serviceRepository;
            }
        }

        public IRepository<ServiceClassifer> ServiceClassifers
        {
            get
            {
                if (serviceClassiferRepository == null)
                {
                    serviceClassiferRepository = new ServiceClassiferRepository(database);
                }

                return serviceClassiferRepository;
            }
        }

        public IRepository<Document> Documents
        {
            get
            {
                if (documentRepository == null)
                {
                    documentRepository = new DocumentRepository(database);
                }

                return documentRepository;
            }
        }

        public UnitOfWork(ApplicationContext database)
        {
            this.database = database;
        }

        public void Save()
        {
            database.SaveChanges();
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
