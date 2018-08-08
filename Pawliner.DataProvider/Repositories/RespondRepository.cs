using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class RespondRepository : IRepository<Respond>
    {
        private ApplicationContext database;

        public RespondRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(Respond item)
        {
            database.Responds.Add(item);
        }

        public void Delete(int id)
        {
            var respond = database.Responds.Find(id);
            if (respond != null)
            {
                database.Responds.Remove(respond);
            }
        }

        public Respond Get(int? id)
        {
            return database.Responds.Find(id);
        }

        public IEnumerable<Respond> GetList()
        {
            return database.Responds;
        }

        public void Update(Respond item)
        {
            database.Entry(item).State = EntityState.Modified;
        }
    }
}
