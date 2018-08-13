using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class OrderRepository : IRepository<Order>
    {
        private ApplicationContext database;

        public OrderRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(Order item)
        {
            database.Orders.Add(item);
        }

        public void Delete(int id)
        {
            var order = database.Orders.Find(id);
            if (order != null)
            {
                database.Orders.Remove(order);
            }
        }

        public Order Get(int? id)
        {
            return database.Orders.Find(id);
        }

        public IEnumerable<Order> GetList()
        {
            return database.Orders.Include(o => o.Photos);
        }

        public void Update(Order item)
        {
            database.Entry(item).State = EntityState.Modified;
        }
    }
}
