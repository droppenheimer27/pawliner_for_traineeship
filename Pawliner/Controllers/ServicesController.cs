using AutoMapper;
using Pawliner.Logic;
using Pawliner.Model;
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
        public IEnumerable<ServiceViewModel> Get()
        {
            var services = Mapper.Map<IEnumerable<ServiceTransport>, IEnumerable<ServiceViewModel>>(ServiceManager.GetServices());
            return services;
        }

        [HttpGet]
        public ServiceViewModel Get(int id)
        {
            var service = Mapper.Map<ServiceTransport, ServiceViewModel>(ServiceManager.GetService(id));
            return service;
        }

        [HttpPost]
        public IHttpActionResult Post(CreateServiceViewModel model)
        {
            var service = new CreateServiceTransport
            {
                Description = model.Description
            };

            ServiceManager.CreateService(service);

            return Ok();
        }

        [HttpPut]
        public IHttpActionResult Put(EditServiceViewModel model)
        {

            var service = Mapper.Map<EditServiceViewModel, EditServiceTransport>(model);
            ServiceManager.UpdateService(service);

            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                ServiceManager.DeleteService(id);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Error", ex.Message);
                return BadRequest(ModelState);
            }
           
            return Ok();
        }
    }
}