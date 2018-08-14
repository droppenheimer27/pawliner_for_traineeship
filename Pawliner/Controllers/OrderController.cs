using AutoMapper;
using Pawliner.Common;
using Pawliner.Logic;
using Pawliner.Model;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Pawliner.Controllers
{
    [ExceptionLogger]
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
        public OrderPagebleViewModel Get([FromUri]List<string> filter, int page = 1, int perPage = 10)
        {
            var orders = Mapper.Map<IEnumerable<OrderTransport>, List<OrderViewModel>>(OrderManager.GetOrders(filter));
            var pageInfo = new PageInfo
            {
                currentPage = page,
                perPage = perPage,
                totalCount = orders.Count
            };

            var result = new OrderPagebleViewModel
            {
                _meta = pageInfo,
                items = orders.Skip((page - 1) * perPage).Take(perPage)
            };

            return result;
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

            return Ok(model);
        }

        [Route("api/order/Gallery")]
        [HttpPost]
        public IHttpActionResult AddPhotos()
        {
            if (HttpContext.Current.Request.Files.Count > 0)
            {
                var photos = new List<PhotoViewModel>();
                foreach (string fileName in HttpContext.Current.Request.Files)
                {
                    var file = HttpContext.Current.Request.Files[fileName];
                    var photoId = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    photos.Add(new PhotoViewModel
                    {
                        FileName = file.FileName,
                        Path = "app/modules/main/img/orders/" + photoId,
                        Users = null,
                        Orders = null,
                        Executors = null
                    });

                    file.SaveAs(HttpContext.Current.Server.MapPath("~/Client/app/modules/main/img/orders/" + photoId));
                }

                NameValueCollection form = HttpContext.Current.Request.Form;

                var model = Pawmapper<OrderIdentityViewModel>.Map(form, new OrderIdentityViewModel());
                var transportPhotos = Mapper.Map<List<PhotoViewModel>, List<PhotoTransport>>(photos);
                OrderManager.AddPhotos(int.Parse(model.Id), transportPhotos);
            }

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
