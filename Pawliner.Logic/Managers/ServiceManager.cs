using System;
using System.Linq;
using System.Collections.Generic;
using Pawliner.DataProvider;
using AutoMapper;

namespace Pawliner.Logic
{
    public class ServiceManager : IServiceManager
    {
        IUnitOfWork database;

        public ServiceManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public void CreateService(ServiceTransport service)
        {
            throw new NotImplementedException();
        }

        public void DeleteService(int id)
        {
            throw new NotImplementedException();
        }

        public ServiceTransport GetService(int id)
        {
            var service = database.Services.Get(id);
            return new ServiceTransport
            {
                Id = service.Id,
                Description = service.Description
            };
        }

        public IEnumerable<ServiceTransport> GetServices()
        {
            return Mapper.Map<IEnumerable<Service>, IEnumerable<ServiceTransport>>(database.Services.GetList());
        }

        public void UpdateService(ServiceTransport service)
        {
            throw new NotImplementedException();
        }
    }
}
