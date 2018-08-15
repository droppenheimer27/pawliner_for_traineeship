using System.Collections.Generic;
using System.Threading.Tasks;
using Pawliner.DataProvider;

namespace Pawliner.Logic
{
    public interface IOrderManager
    {
        void CreateOrder(OrderTransport order);
        void UpdateOrder(OrderTransport order);
        void AddPhotos(int id, List<PhotoTransport> photos);
        void UpdateStatusOrder(OrderEditStatusTransport order);
        void DeleteOrder(int id);
        OrderTransport GetOrder(int id);
        IEnumerable<OrderTransport> GetOrders(List<string> filter);
    }
}
