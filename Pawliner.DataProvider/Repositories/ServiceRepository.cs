using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Pawliner.DataProvider
{
    public class ServiceRepository : IRepository<Service>
    {
        private ApplicationContext database;

        public ServiceRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(Service item)
        {
            database.Services.Add(item);
        }

        public void Delete(int id)
        {
            var service = database.Services.Find(id);
            if (service != null)
            {
                database.Services.Remove(service);
            }
        }

        public Service Get(int? id)
        {
            return database.Services.Find(id);
        }

        public IEnumerable<Service> GetList()
        {
            return database.Services.Include(s => s.ServiceClassifers);
        }

        public void Update(Service item)
        {
            database.Entry(item).State = EntityState.Modified; 
        }
    }
}
