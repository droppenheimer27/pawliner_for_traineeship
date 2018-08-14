using Pawliner.Logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Pawliner.Controllers
{
    [ExceptionLogger]
    public class ServicesController : ApiController
    {
        protected IServiceManager serviceManager;

        public ServicesController(IServiceManager serviceManager)
        {
            ServiceManager = serviceManager;
        }

        public IServiceManager ServiceManager
        {
            get { return serviceManager; }
            set { serviceManager = value; }
        }

        [HttpGet]
        public IEnumerable<ServiceTransport> Get()
        {
            return ServiceManager.GetServices();
        }

        [HttpGet]
        public ServiceTransport Get(int id)
        {
            return ServiceManager.GetService(id);
        }
    }
}