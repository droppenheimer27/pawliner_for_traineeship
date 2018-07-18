using System.Collections.Generic;
using System.Data.Entity;

namespace Pawliner.DataProvider
{
    public class ExecutorRepository : IRepository<Executor>
    {
        private ApplicationContext database;

        public ExecutorRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(Executor item)
        {
            database.Executors.Add(item);
        }

        public void Delete(int id)
        {
            var executor = database.Executors.Find(id);
            if (executor != null)
            {
                database.Executors.Remove(executor);
            }
        }

        public Executor Get(int id)
        {
            return database.Executors.Find(id);
        }

        public IEnumerable<Executor> GetList()
        {
            return database.Executors;
        }

        public void Update(Executor item)
        {
            database.Entry(item).State = EntityState.Modified;
        }
    }
}
