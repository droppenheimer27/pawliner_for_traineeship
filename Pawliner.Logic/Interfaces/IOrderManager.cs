using System.Collections.Generic;
using System.Threading.Tasks;
using Pawliner.DataProvider;
using Pawliner.Model;

namespace Pawliner.Logic
{
    public interface IOrderManager
    {
        void CreateOrder(OrderViewModel order);
        Order GetOrder(int id);
        IEnumerable<Order> GetOrders();
    }
}
