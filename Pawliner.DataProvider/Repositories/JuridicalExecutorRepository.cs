using System.Collections.Generic;
using System.Data.Entity;

namespace Pawliner.DataProvider
{
    public class JuridicalExecutorRepository : IRepository<JuridicalExecutor>
    {
        private ApplicationContext database;

        public JuridicalExecutorRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(JuridicalExecutor item)
        {
            database.JuridicalExecutors.Add(item);
        }

        public void Update(JuridicalExecutor item)
        {
            database.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            var executor = database.JuridicalExecutors.Find(id);
            if (executor != null)
            {
                database.JuridicalExecutors.Remove(executor);
            }
        }

        public JuridicalExecutor Get(int? id)
        {
            return database.JuridicalExecutors.Find(id);
        }

        public IEnumerable<JuridicalExecutor> GetList()
        {
            return database.JuridicalExecutors;
        }
    }
}
