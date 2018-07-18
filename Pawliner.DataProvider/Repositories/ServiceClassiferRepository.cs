;using System.Collections.Generic;
using System.Data.Entity;

namespace Pawliner.DataProvider
{
    public class ServiceClassiferRepository : IRepository<ServiceClassifer>
    {
        private ApplicationContext database;
        public ServiceClassiferRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(ServiceClassifer item)
        {
            database.ServiceClassifers.Add(item);
        }

        public void Delete(int id)
        {
            var serviceClassifer = database.ServiceClassifers.Find(id);
            if (serviceClassifer != null)
            {
                database.ServiceClassifers.Remove(serviceClassifer);
            }
        }

        public ServiceClassifer Get(int id)
        {
            return database.ServiceClassifers.Find(id);
        }

        public IEnumerable<ServiceClassifer> GetList()
        {
            return database.ServiceClassifers;
        }

        public void Update(ServiceClassifer item)
        {
            database.Entry(item).State = EntityState.Modified;
        }
    }
}
