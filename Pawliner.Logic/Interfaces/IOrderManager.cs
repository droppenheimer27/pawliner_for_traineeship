using System.Collections.Generic;
using Pawliner.DataProvider;

namespace Pawliner.Logic
{
    public interface IOrderManager
    {
        void MakeOrder();
        Order GetOrder(int id);
        IEnumerable<Order> GetOrders();
    }
}
