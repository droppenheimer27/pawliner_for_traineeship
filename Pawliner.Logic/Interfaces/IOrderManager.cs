using System.Collections.Generic;
using System.Threading.Tasks;
using Pawliner.DataProvider;
using Pawliner.Model;

namespace Pawliner.Logic
{
    public interface IOrderManager
    {
        void CreateOrder(OrderTransport order);
        void UpdateOrder(OrderTransport order);
        void DeleteOrder(int id);
        OrderTransport GetOrder(int id);
        IEnumerable<OrderTransport> GetOrders(List<string> filter);
    }
}
