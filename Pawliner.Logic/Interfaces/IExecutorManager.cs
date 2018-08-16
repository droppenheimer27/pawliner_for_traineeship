using Pawliner.Model;
using System.Collections.Generic;

namespace Pawliner.Logic
{
    public interface IExecutorManager
    {
        void CreateExecutor(ExecutorViewModel executor);
        void UpdateExecutor(ExecutorViewModel executor);
        void DeleteExecutor(int id);
        void AddPhotos(int id, List<PhotoTransport> model);
        void AddDocument(int id, DocumentTransport model);
        void UpdateStatus(UpdateExecutorStatusTransport model);
        ExecutorTransport GetExecutor(int id);
        IEnumerable<ExecutorTransport> GetExecutors(List<string> filter);
    }
}
