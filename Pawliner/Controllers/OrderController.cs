using AutoMapper;
using Pawliner.Logic;
using Pawliner.Model;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace Pawliner.Controllers
{
    [Authorize]
    public class OrderController : ApiController
    {
        protected IOrderManager orderManager;

        public OrderController(IOrderManager orderManager)
        {
            OrderManager = orderManager;
        }

        public IOrderManager OrderManager
        {
            get { return orderManager; }
            set { orderManager = value;  }
        }

        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<OrderTransport> Get([FromUri]List<string> filter, int page = 1)
        {
            return OrderManager.GetOrders(filter, page);
        }

        [AllowAnonymous]
        [HttpGet]
        public OrderViewModel Get(int id)
        {
            var orderViewModel = Mapper.Map<OrderTransport, OrderViewModel>(OrderManager.GetOrder(id));
            return orderViewModel;
        }

        [HttpPost]
        public IHttpActionResult Post(OrderViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Mapper.Initialize(cfg => cfg.CreateMap<OrderViewModel, OrderTransport>());
            //var order = Mapper.Map<OrderViewModel, OrderTransport>(model);

            var order = new OrderTransport
            {
                UserId = model.UserId,
                ServiceDescription = model.ServiceDescription,
                ServiceClassiferDescription = model.ServiceClassiferDescription,
                Header = model.Header,
                Description = model.Description,
                City = model.City,
                Address = model.Address,
                Price = model.Price,
                Name = model.Name,
                PhoneNumber = model.PhoneNumber,
                CompletedOn = model.CompletedOn,
                CreatedAt = DateTime.UtcNow.ToString("d"),
            };

            OrderManager.CreateOrder(order);

            return Ok();
        }

        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody]OrderViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var order = OrderManager.GetOrder(id);

            order.ServiceClassiferDescription = model.ServiceClassiferDescription;
            order.Header = model.Header;
            order.Description = model.Description;
            order.City = model.City;
            order.Address = model.Address;
            order.Price = model.Price;
            order.Name = model.Name;
            order.PhoneNumber = model.PhoneNumber;
            order.CompletedOn = model.CompletedOn;
            order.UpdatedAt = DateTime.UtcNow.ToString("d");

            OrderManager.UpdateOrder(order);

            return Ok();
        }

        [Route("api/order/UpdateStatus")]
        [HttpPut]
        public IHttpActionResult UpdateStatus([FromBody]OrderEditStatusViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            OrderManager.UpdateStatusOrder(new OrderEditStatusTransport
            {
                Id = model.Id,
                Status = model.Status
            });

            return Ok();
        }

        [HttpDelete]
        public void Delete(int id)
        {
            OrderManager.DeleteOrder(id);
        }
    }
}
