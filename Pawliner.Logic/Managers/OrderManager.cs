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

        public void CreateOrder(OrderTransport orderTransport)
        {
            var serviceClassifer = database.ServiceClassifers.GetList()
                .FirstOrDefault(sr => sr.Id.ToString() == orderTransport.ServiceClassiferDescription);

            database.Orders.Create(new Order
            {
                UserId = orderTransport.UserId,
                Header = orderTransport.Header,
                Description = orderTransport.Description,
                City = orderTransport.City,
                Address = orderTransport.Address,
                Price = orderTransport.Price,
                Name = orderTransport.Name,
                PhoneNumber = orderTransport.PhoneNumber,
                CompletedOn = orderTransport.CompletedOn,
                CreatedAt = orderTransport.CreatedAt,
                ServiceClassiferId = serviceClassifer.Id
            });

            database.Save();
        }

        public void UpdateOrder(OrderTransport model)
        {
            var service = database.ServiceClassifers.Get(int.Parse(model.ServiceClassiferDescription));
            model.ServiceClassiferDescription = service.Description;

            var order = database.Orders.Get(model.Id);
            order.Name = model.Name;
            order.Header = model.Header;
            order.Description = model.Description;
            order.Address = model.Address;
            order.CompletedOn = model.CompletedOn;
            order.Price = model.Price;
            order.ServiceClassifer = service;
            order.PhoneNumber = model.PhoneNumber;
            order.UpdatedAt = model.UpdatedAt;

            database.Orders.Update(order);
            database.Save();
        }

        public void UpdateStatusOrder(OrderEditStatusTransport model)
        {
            var order = database.Orders.Get(model.Id);
            if (string.Equals(model.Status, "Submit"))
            {
                order.Status = OrderStatus.Submited;
            }
            else if (string.Equals(model.Status, "Done"))
            {
                order.Status = OrderStatus.Done;
            }

            database.Orders.Update(order);
            database.Save();
        }

        public void AddPhotos(int id, List<PhotoTransport> models)
        {
            var photos = Mapper.Map<List<PhotoTransport>, List<Photo>>(models);

            var order = database.Orders.Get(id);
            order.Photos = photos;

            database.Orders.Update(order);
            database.Save();
        }

        public void DeleteOrder(int id)
        {
            database.Orders.Delete(id);
            database.Save();
        }

        public OrderTransport GetOrder(int id)
        {
            var order = database.Orders.GetList().FirstOrDefault(o => o.Id == id);
            var service = database.ServiceClassifers.Get(order.ServiceClassiferId);
            var responds = database.Responds
                .GetList()
                .Where(r => r.OrderId == id)
                .ToList();

            var orderTransport = new OrderTransport
            {
                Id = order.Id,
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
                ServiceClassiferDescription = service.Id.ToString(),
                ServiceDescription = service.Description,
                Photos = order.Photos.ToList(),
                Responds = responds,
            };

            if (order.Status == OrderStatus.Active)
            {
                orderTransport.OrderStatus = "Active";
            }
            else if (order.Status == OrderStatus.Submited)
            {
                orderTransport.OrderStatus = "Submited";
            }
            else if (order.Status == OrderStatus.UnSubmited)
            {
                orderTransport.OrderStatus = "Unsubmited";
            }
            else if (order.Status == OrderStatus.Done)
            {
                orderTransport.OrderStatus = "Done";
            }

            return orderTransport;
        }

        public IEnumerable<OrderTransport> GetOrders(List<string> filter, string search)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Order, OrderTransport>()).CreateMapper();
            var orders = mapper.Map<IEnumerable<Order>, List<OrderTransport>>(database.Orders.GetList()
                .OrderByDescending(o => o.Id));

            if (!string.IsNullOrEmpty(search))
            {
                orders = orders.Where(o => o.Header.Contains(search)).ToList();
            }

            if (filter.Count == 0)
            {
                return orders;
            }

            return orders.Where(o => filter.Contains(o.ServiceClassiferDescription));
        }
    }
}
