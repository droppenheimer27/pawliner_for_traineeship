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

        public void CreateService(CreateServiceTransport model)
        {
            database.Services.Create(new Service
            {
                Description = model.Description
            });
            database.Save();
        }

        public void DeleteService(int id)
        {
            var service = database.Services.Get(id);
            var serviceClassifers = database.ServiceClassifers.GetList().ToList().Where(sr => sr.Service == service);
            if (serviceClassifers.SelectMany(sr => sr.Orders).Count() > 0 || serviceClassifers.SelectMany(sr => sr.Executors).Count() > 0)
            {
                throw new Exception("You cannot remove this service because some orders or executors depends of it");
            }

            database.Services.Delete(id);
            database.Save();
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

        public void UpdateService(EditServiceTransport model)
        {
            var serviceClassifers = database.ServiceClassifers
                .GetList()
                .Where(sr => model.ServiceClassifersDescriptions.Contains(sr.Description)).ToList();

            var newServiceClassifers = model.ServiceClassifersDescriptions.Except(serviceClassifers.Select(sr => sr.Description));

            foreach (var description in newServiceClassifers)
            {
                serviceClassifers.Add(new ServiceClassifer
                {
                    Description = description
                });
            }

            var service = database.Services.Get(model.Id);
            service.Description = model.Description;
            service.ServiceClassifers = serviceClassifers;

            database.Services.Update(service);
            database.Save();
        }
    }
}
