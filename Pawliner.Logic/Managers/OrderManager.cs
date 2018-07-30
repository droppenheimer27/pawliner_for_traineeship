using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Pawliner.DataProvider;

namespace Pawliner.Logic
{
    public class OrderManager : IOrderManager
    {
        IUnitOfWork database;

        public OrderManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public void CreateOrder(OrderTransport order)
        {
            var service = database.Services.GetList().FirstOrDefault(s => string.Equals(s.Description, order.Service));

            database.Orders.Create(new Order
            {
                UserId = order.UserId,
                ServiceId = service.Id,
                Header = order.Header,
                Description = order.Description,
                City = order.City,
                Address = order.Address,
                Price = order.Price,
                Name = order.Name,
                PhoneNumber = order.PhoneNumber,
                CompletedOn = order.CompletedOn,
                CreatedAt = order.CreatedAt
            });

            database.Save();
        }

        public void UpdateOrder(OrderTransport model)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<OrderTransport, Order>());
            var order = Mapper.Map<OrderTransport, Order>(model);

            database.Orders.Update(order);
        }

        public void DeleteOrder(int id)
        {
            database.Orders.Delete(id);
        }

        public OrderTransport GetOrder(int id)
        {
            var order = database.Orders.Get(id);
            return new OrderTransport
            {
                UserId = order.UserId,
                ServiceId = order.ServiceId,
                Header = order.Header,
                Description = order.Description,
                City = order.City,
                Address = order.Address,
                Price = order.Price,
                Name = order.Name,
                PhoneNumber = order.PhoneNumber,
                CompletedOn = order.CompletedOn,
                CreatedAt = order.CreatedAt
            };
        }

        public IEnumerable<OrderTransport> GetOrders()
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Order, OrderTransport>()).CreateMapper();
            return mapper.Map<IEnumerable<Order>, List<OrderTransport>>(database.Orders.GetList().OrderByDescending(o => o.Id));
        }
    }
}
