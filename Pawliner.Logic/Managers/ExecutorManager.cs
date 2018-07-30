using Pawliner.DataProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.Logic
{
    public class ExecutorManager
    {
        IUnitOfWork database;

        public ExecutorManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public void CreateExecutor() // TODO: ExecutorViewModel
        {
            database.Executors.Create(new Executor
            {
                
            });
        }

        public Executor GetExecutor(int id)
        {
            return database.Executors.Get(id);
        }

        public IEnumerable<Executor> GetExecutors()
        {
            return database.Executors.GetList();
        }
    }
}
