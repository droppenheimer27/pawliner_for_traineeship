﻿using AutoMapper;
using Pawliner.DataProvider;
using Pawliner.Model;
using System.Collections.Generic;
using System.Linq;

namespace Pawliner.Logic
{
    public class ExecutorManager : IExecutorManager
    {
        IUnitOfWork database;

        public ExecutorManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public void CreateExecutor(ExecutorViewModel model)
        {
            var services = database.ServiceClassifers.GetList()
                .Where(s => model.ServiceClassifersIds
                .Contains(s.Id.ToString()))
                .ToList();

            var executor = new Executor
            {
                UserId = model.UserId,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Patronymic = model.Patronymic,
                Description = model.Description,
                ServiceClassifers = services
            };

            if (string.Equals(model.Type, "NP"))
            {
                executor.ExecutorType = ExecutorType.Natural;
                database.Executors.Create(executor);
                database.Save();

                var natural = new NaturalExecutor
                {
                    Id = executor.Id
                };

                database.NaturalExecutors.Create(natural);
                database.Save();
            }
            else if (string.Equals(model.Type, "ST"))
            {
                executor.ExecutorType = ExecutorType.SoleTrader;
                database.Executors.Create(executor);
                database.Save();

                var trader = new SoleTraderExecutor
                {
                    Id = executor.Id,
                    PayerAccountNumber = model.PayerAccountNumber
                };

                database.SoleTraderExecutors.Create(trader);
                database.Save();
            }
            else if (string.Equals(model.Type, "JP"))
            {
                executor.ExecutorType = ExecutorType.Juridical;
                database.Executors.Create(executor);
                database.Save();

                var juridical = new JuridicalExecutor
                {
                    Id = executor.Id,
                    PayerAccountNumber = model.PayerAccountNumber,
                    FullJuredicalName = model.FullJuredicalName,
                    ShortJuredicalName = model.ShortJuredicalName
                };

                database.JuridicalExecutors.Create(juridical);
                database.Save();
            }
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

        public IEnumerable<ExecutorTransport> GetExecutors(List<string> filter, int page)
        {
            int pageSize = 10; // dont forget change it
            //var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Executor, ExecutorTransport>())
            //    .CreateMapper();

            var executors = Mapper.Map<IEnumerable<Executor>, List<ExecutorTransport>>(database.Executors
                .GetList()
                .OrderByDescending(o => o.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize));

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
                    UserId = ex.UserId,
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
