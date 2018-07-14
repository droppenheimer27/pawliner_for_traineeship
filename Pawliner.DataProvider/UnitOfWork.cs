using System;

namespace Pawliner.DataProvider
{
    public class UnitOfWork : IUnitOfWork
    {
        private UserContext database;
        private UserRepository userRepository;

        private bool disposed = false; //TODO: убрать к чертям обычного юзера и попробовать починить зависимость.

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

        public UnitOfWork()
        {
            database = new UserContext();
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
