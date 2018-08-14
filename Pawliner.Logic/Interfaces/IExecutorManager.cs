﻿using Pawliner.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.Logic
{
    public interface IExecutorManager
    {
        void CreateExecutor(ExecutorViewModel executor);
        void UpdateExecutor(ExecutorViewModel executor);
        void DeleteExecutor(int id);
        void AddPhotos(int id, List<PhotoTransport> models);
        ExecutorTransport GetExecutor(int id);
        IEnumerable<ExecutorTransport> GetExecutors(List<string> filter);
    }
}
