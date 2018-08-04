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
            var executor = database.Executors.GetList().FirstOrDefault(e => e.Id == id);

            if (executor.ExecutorType == ExecutorType.Natural)
            {
                executor.Type = "";
                executor.NaturalExecutor = new NaturalExecutor
                {
                    Id = id,
                };
            } 
            else if (executor.ExecutorType == ExecutorType.SoleTrader)
            {
                var trader = database.SoleTraderExecutors.Get(id);

                executor.Type = "ST";
                executor.SoleTraderExecutor = new SoleTraderExecutor
                {
                    Id = id,
                    PayerAccountNumber = trader.PayerAccountNumber
                };
            }
            else if (executor.ExecutorType == ExecutorType.Juridical)
            {
                var juridical = database.JuridicalExecutors.Get(id);

                executor.Type = juridical.ShortJuredicalName;
                executor.JuridicalExecutor = new JuridicalExecutor
                {
                    Id = id,
                    FullJuredicalName = juridical.FullJuredicalName,
                    ShortJuredicalName = juridical.ShortJuredicalName,
                    PayerAccountNumber = juridical.PayerAccountNumber
                };
            }

            return Mapper.Map<Executor, ExecutorTransport>(executor);
        }

        public IEnumerable<ExecutorTransport> GetExecutors(List<string> filter)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Executor, ExecutorTransport>())
                .CreateMapper();

            var executors = mapper.Map<IEnumerable<Executor>, List<ExecutorTransport>>(database.Executors
                .GetList()
                .OrderByDescending(o => o.Id));

            var naturals = database.NaturalExecutors.GetList();
            var traders = database.SoleTraderExecutors.GetList();
            var juridicals = database.JuridicalExecutors.GetList();


            var result =
                from ex in executors
                join n in naturals on ex.Id equals n.Id into exn
                from subn in exn.DefaultIfEmpty()
                join tr in traders on ex.Id equals tr.Id into extr
                from subtr in extr.DefaultIfEmpty()
                join j in juridicals on ex.Id equals j.Id into exj
                from subj in exj.DefaultIfEmpty()
                select new ExecutorTransport
                {
                    Id = ex.Id,
                    Description = ex.Description,
                    FirstName = ex.FirstName,
                    LastName = ex.LastName,
                    Patronymic = ex.Patronymic,
                    ExecutorType = ex.ExecutorType,
                    ServiceClassifers = ex.ServiceClassifers,
                    NaturalExecutor = new NaturalExecutorTransport
                    {
                        Id = subn?.Id ?? 0
                    },
                    SoleTraderExecutor = new SoleTraderExecutorTransport
                    {
                        Id = subtr?.Id ?? 0,
                        PayerAccountNumber = subtr?.PayerAccountNumber ?? 0
                    },
                    JuridicalExecutor = new JuridicalExecutorTransport
                    {
                        Id = subj?.Id ?? 0,
                        FullJuredicalName = subj?.FullJuredicalName ?? string.Empty,
                        ShortJuredicalName = subj?.ShortJuredicalName ?? string.Empty,
                        PayerAccountNumber = subj?.PayerAccountNumber ?? 0
                    }
                };

            var filterServices = (result.SelectMany(e => e.ServiceClassifers))
                .Where(sr => filter.Contains(sr.Description)).ToList();

            if (filter.Count == 0)
            {
                return result; 
            }

            return result.Where(s => s.ServiceClassifers.Any(sr => filterServices.Contains(sr))); 
        }
    }
}
