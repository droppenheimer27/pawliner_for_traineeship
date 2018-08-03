using AutoMapper;
using Pawliner.DataProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.Logic
{
    public class ExecutorManager : IExecutorManager
    {
        IUnitOfWork database;

        public ExecutorManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public void CreateExecutor(ExecutorTransport executor)
        {
            throw new NotImplementedException();
        }
        public void UpdateExecutor(ExecutorTransport model)
        {
            var executor = Mapper.Map<ExecutorTransport, Executor>(model);
            database.Executors.Update(executor);
        }

        public void DeleteExecutor(int id)
        {
            database.Executors.Delete(id);
        }

        public ExecutorTransport GetExecutor(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ExecutorTransport> GetExecutors(List<string> filter)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Executor, ExecutorTransport>())
                .CreateMapper();

            var executors = mapper.Map<IEnumerable<Executor>, List<ExecutorTransport>>(database.Executors
                .GetList()
                .OrderByDescending(o => o.Id));

            if (filter.Count == 0)
            {
                return executors;
            }

            var services = (executors.SelectMany(e => e.ServiceClassiferTransports))
                .Select(sct => sct.Description);

            return executors.Where(o => filter.Intersect(services) != null);
        }
    }
}
