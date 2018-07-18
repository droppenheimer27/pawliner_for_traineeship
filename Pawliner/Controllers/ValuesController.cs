using Pawliner.DataProvider;
using Pawliner.Logic;
using Pawliner.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Pawliner.Controllers
{
    public class ValuesController : ApiController
    {
        protected OrderManager orderManager;

        //public ValuesController()
        //{ }

        public ValuesController(OrderManager orderManager)
        {
            OrderManager = orderManager;
        }

        public OrderManager OrderManager
        {
            get { return orderManager; }
            set { orderManager = value;  }
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/1
        public OrderViewModel Get(int id)
        {
            var order = OrderManager.GetOrder(id);

            var orderViewModel = new OrderViewModel
            {
                Header = order.Header,
                Description = order.Description,
            };

            return orderViewModel;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
