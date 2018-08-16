using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Http;
using AutoMapper;
using Pawliner.Common;
using Pawliner.Logic;
using Pawliner.Model;

namespace Pawliner.Controllers
{
    [ExceptionLogger]
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
        public ExecutorPagebleViewModel Get([FromUri]List<string> filter, int page = 1, int perPage = 10)
        {
            var executors = Mapper.Map<IEnumerable<ExecutorTransport>, List<ExecutorViewModel>>(ExecutorManager.GetExecutors(filter));
            var pageInfo = new PageInfo
            {
                currentPage = page,
                perPage = perPage,
                totalCount = executors.Count
            };

            var result = new ExecutorPagebleViewModel
            {
                _meta = pageInfo,
                items = executors.Skip((page - 1) * perPage).Take(perPage)
            };

            return result;
        }

        [AllowAnonymous]
        [HttpGet]
        public ExecutorViewModel Get(int id)
        {
            return Mapper.Map<ExecutorTransport, ExecutorViewModel>(ExecutorManager.GetExecutor(id));
        }

        [Route("api/executors/Gallery")]
        [HttpPost]
        public IHttpActionResult AddPhotos()
        {
            if (HttpContext.Current.Request.Files.Count > 0)
            {
                var photos = new List<PhotoViewModel>();
                foreach (string fileName in HttpContext.Current.Request.Files)
                {
                    var file = HttpContext.Current.Request.Files[fileName];
                    var photoId = Guid.NewGuid() + System.IO.Path.GetExtension(file.FileName);
                    photos.Add(new PhotoViewModel
                    {
                        FileName = file.FileName,
                        Path = "app/modules/main/img/executors/" + photoId,
                        Users = null,
                        Orders = null,
                        Executors = null
                    });

                    file.SaveAs(HttpContext.Current.Server.MapPath("~/Client/app/modules/main/img/executors/" + photoId));
                }

                NameValueCollection form = HttpContext.Current.Request.Form;

                var model = Pawmapper<ExecutorIdentityViewModel>.Map(form, new ExecutorIdentityViewModel());
                var transportPhotos = Mapper.Map<List<PhotoViewModel>, List<PhotoTransport>>(photos);
                ExecutorManager.AddPhotos(int.Parse(model.Id), transportPhotos);
            }

            return Ok();
        }

        [Route("api/executors/Document")]
        [HttpPost]
        public IHttpActionResult AddDocument()
        {
            if (HttpContext.Current.Request.Files.Count > 0)
            {
                var file = HttpContext.Current.Request.Files[0];
                var documentId = Guid.NewGuid() + System.IO.Path.GetExtension(file.FileName);

                var document = new DocumentViewModel
                {
                    FileName = file.FileName,
                    Path = "app/modules/main/img/documents/" + documentId
                };

                file.SaveAs(HttpContext.Current.Server.MapPath("~/Client/app/modules/main/img/documents/" + documentId));

                NameValueCollection form = HttpContext.Current.Request.Form;

                var model = Pawmapper<ExecutorIdentityViewModel>.Map(form, new ExecutorIdentityViewModel());
                //var transportDocument = Mapper.Map<DocumentViewModel, DocumentTransport>(document);
                var transportDocument = new DocumentTransport
                {
                    FileName = document.FileName,
                    Path = document.Path
                };
                ExecutorManager.AddDocument(int.Parse(model.Id), transportDocument);
            }

            return Ok();
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

        [Route("api/executors/UpdateStatus")]
        [HttpPut]
        public IHttpActionResult UpdateStatus([FromBody]UpdateExecutorStatusViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ExecutorManager.UpdateStatus(new UpdateExecutorStatusTransport
            {
                Id = model.Id,
                Status = model.Status
            });

            return Ok();
        }

        [HttpDelete]
        public void Delete(int id)
        {
            ExecutorManager.DeleteExecutor(id);
        }
    }
}