using System.Collections.Generic;
using System.Data.Entity;

namespace Pawliner.DataProvider
{
    public class SoleTraderExecutorRepository : IRepository<SoleTraderExecutor>
    {
        private ApplicationContext database;

        public SoleTraderExecutorRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(SoleTraderExecutor item)
        {
            database.SoleTraderExecutors.Add(item);
        }

        public void Update(SoleTraderExecutor item)
        {
            database.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            var executor = database.SoleTraderExecutors.Find(id);
            if (executor != null)
            {
                database.SoleTraderExecutors.Remove(executor);
            }
        }

        public SoleTraderExecutor Get(int? id)
        {
            return database.SoleTraderExecutors.Find(id);
        }

        public IEnumerable<SoleTraderExecutor> GetList()
        {
            return database.SoleTraderExecutors;
        }
    }
}
