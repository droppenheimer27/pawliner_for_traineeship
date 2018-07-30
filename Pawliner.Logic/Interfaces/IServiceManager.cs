using System.Collections.Generic;

namespace Pawliner.Logic
{
    public interface IServiceManager
    {
        void CreateService(ServiceTransport service);
        void UpdateService(ServiceTransport service);
        void DeleteService(int id);
        ServiceTransport GetService(int id);
        IEnumerable<ServiceTransport> GetServices();
    }
}
