using AutoMapper;
using Pawliner.DataProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.Logic
{
    public class RespondManager : IRespondManager
    {
        IUnitOfWork database;

        public RespondManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public void CreateRespond(RespondTransport model)
        {
            model.CreatedAt = DateTime.UtcNow.ToString("d");
            var respond = Mapper.Map<RespondTransport, Respond>(model);
            database.Responds.Create(respond);
            database.Save();
        }

        public void DeleteRespond(int id)
        {
            database.Responds.Delete(id);
            database.Save();
        }

        public RespondTransport GetRespond(int id)
        {
            var respond = database.Responds.Get(id);
            var order = database.Orders.Get(respond.OrderId);
            var executor = database.Executors.Get(respond.ExecutorId);

            var respondTransport = Mapper.Map<Respond, RespondTransport>(respond);
            var orderTransport = Mapper.Map<Order, OrderTransport>(order);
            var executorTransport = Mapper.Map<Executor, ExecutorTransport>(executor);

            respondTransport.Order = orderTransport;
            respondTransport.Executor = executorTransport;

            return respondTransport;
        }

        public IEnumerable<RespondTransport> GetResponds()
        {
            var responds = Mapper.Map<IEnumerable<Respond>, List<RespondTransport>>(database.Responds.GetList());
            return responds;
        }

        public void UpdateRespond(EditRespondTransport model)
        {
            var respond = database.Responds.Get(model.Id);
            respond.Content = model.Content;

            database.Responds.Update(respond);
            database.Save();
        }
    }
}
