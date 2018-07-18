using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pawliner.DataProvider;
using Pawliner.Model;

namespace Pawliner.Logic
{
    public class OrderManager : IOrderManager
    {
        IUnitOfWork database;

        public OrderManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public void CreateOrder(OrderViewModel order)
        {
            database.Orders.Create(new Order
            {
                UserId = order.UserId,
                Header = order.Header,
                Description = order.Description,
                City = order.City,
                Address = order.Address,
                Price = order.Price,
                Name = order.Name,
                PhoneNumber = order.PhoneNumber,
                CompletedOn = order.CompletedOn,
                CreatedAt = order.CreatedAt,
                UpdatedAt = order.UpdatedAt
            });
        }

        public Order GetOrder(int id)
        {
            return database.Orders.Get(id);
        }

        public IEnumerable<Order> GetOrders()
        {
            return database.Orders.GetList();
        }
    }
}
