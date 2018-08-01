using System.Linq;
using System.Collections.Generic;
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
            var service = database.Services.GetList().FirstOrDefault(s => string.Equals(s.Description, order.ServiceDescription));
            var serviceClassifer = database.ServiceClassifers.GetList().FirstOrDefault(s => string.Equals(s.Description, order.ServiceClassiferDescription));

            database.Orders.Create(new Order
            {
                Header = order.Header,
                Description = order.Description,
                City = order.City,
                Address = order.Address,
                Price = order.Price,
                Name = order.Name,
                PhoneNumber = order.PhoneNumber,
                CompletedOn = order.CompletedOn,
                CreatedAt = order.CreatedAt,
                ServiceId = service.Id,
                ServiceClassiferId = serviceClassifer.Id
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
            var service = database.ServiceClassifers.Get(order.ServiceClassiferId);

            return new OrderTransport
            {
                Header = order.Header,
                Description = order.Description,
                City = order.City,
                Address = order.Address,
                Price = order.Price,
                Name = order.Name,
                PhoneNumber = order.PhoneNumber,
                CompletedOn = order.CompletedOn,
                CreatedAt = order.CreatedAt,
                ServiceClassiferDescription = service.Description
            };
        }

        public IEnumerable<OrderTransport> GetOrders(List<string> filter)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Order, OrderTransport>()).CreateMapper();

            var orders = mapper.Map<IEnumerable<Order>, List<OrderTransport>>(database.Orders.GetList().OrderByDescending(o => o.Id));
            if (filter.Count == 0)
            {
                return orders;
            }

            return orders.Where(o => filter.Contains(o.ServiceClassiferDescription));
        }
    }
}
