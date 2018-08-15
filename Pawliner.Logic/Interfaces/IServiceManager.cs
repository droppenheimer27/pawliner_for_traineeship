using System.Collections.Generic;

namespace Pawliner.Logic
{
    public interface IServiceManager
    {
        void CreateService(CreateServiceTransport service);
        void UpdateService(EditServiceTransport service);
        void DeleteService(int id);
        ServiceTransport GetService(int id);
        IEnumerable<ServiceTransport> GetServices();
    }
}
