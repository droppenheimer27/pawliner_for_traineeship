using System.Collections.Generic;
using System.Data.Entity;

namespace Pawliner.DataProvider
{
    public class NaturalExecutorRepository : IRepository<NaturalExecutor>
    {
        private ApplicationContext database;

        public NaturalExecutorRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(NaturalExecutor item)
        {
            database.NaturalExecutors.Add(item);
        }

        public void Update(NaturalExecutor item)
        {
            database.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            var executor = database.NaturalExecutors.Find(id);
            if (executor != null)
            {
                database.NaturalExecutors.Remove(executor);
            }
        }

        public NaturalExecutor Get(int? id)
        {
            return database.NaturalExecutors.Find(id);
        }

        public IEnumerable<NaturalExecutor> GetList()
        {
            return database.NaturalExecutors;
        }
    }
}
