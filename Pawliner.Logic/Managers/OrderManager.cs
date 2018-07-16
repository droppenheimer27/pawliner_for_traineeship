using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pawliner.DataProvider;

namespace Pawliner.Logic
{
    public class OrderManager : IOrderManager
    {
        IUnitOfWork database { get; set; }

        public OrderManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public Order GetOrder(int id)
        {
            return database.Orders.Get(id);
        }

        public IEnumerable<Order> GetOrders()
        {
            return database.Orders.GetList();
        }

        public void MakeOrder()
        {
            database.Orders.Create(new Order
            {

            });
        }
    }
}
