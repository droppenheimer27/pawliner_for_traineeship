using System;

namespace Pawliner.DataProvider
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext database;
        private UserRepository userRepository;

        private bool disposed = false;

        public IRepository<User> Users
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

        public UnitOfWork(string connectionString)
        {
            database = new ApplicationContext(connectionString);
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
