using System;
using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;
using Pawliner.Logic;
using Pawliner.Model;

namespace Pawliner.Controllers
{
    [Authorize]
    public class ExecutorsController : ApiController
    {
        protected IExecutorManager executorManager;

        public ExecutorsController(IExecutorManager executorManager)
        {
            ExecutorManager = executorManager;
        }

        public IExecutorManager ExecutorManager
        {
            get { return executorManager; }
            set { executorManager = value; }
        }

        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<ExecutorViewModel> Get([FromUri]List<string> filter, int page = 1, int perPage = 10)
        {
            return Mapper.Map<IEnumerable<ExecutorTransport>, IEnumerable<ExecutorViewModel>>(ExecutorManager.GetExecutors(filter, page));
        }

        [AllowAnonymous]
        [HttpGet]
        public ExecutorViewModel Get(int id)
        {
            return Mapper.Map<ExecutorTransport, ExecutorViewModel>(ExecutorManager.GetExecutor(id));
        }

        [HttpPost]
        public IHttpActionResult Post(ExecutorViewModel model)
        {
            ExecutorManager.CreateExecutor(model);
            return Ok();
        }

        [HttpPut]
        public void Put([FromBody]ExecutorViewModel model)
        {
            ExecutorManager.UpdateExecutor(model);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            ExecutorManager.DeleteExecutor(id);
        }
    }
}