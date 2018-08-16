using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using AutoMapper;
using Pawliner.Logic;
using Pawliner.Model;

namespace Pawliner.Controllers
{
    [ExceptionLogger]
    [Authorize(Roles = "Administrator")]
    public class ExceptionDetailsController : ApiController
    {
        protected IExceptionDetailManager exceptionManager;

        public ExceptionDetailsController(IExceptionDetailManager exceptionManager)
        {
            ExceptionDetailManager = exceptionManager;
        }

        public IExceptionDetailManager ExceptionDetailManager
        {
            get { return exceptionManager; }
            set { exceptionManager = value; }
        }

        [HttpGet]
        public IEnumerable<ExceptionDetailViewModel> Get()
        {
            return Mapper.Map<IEnumerable<ExceptionDetailTransport>, IEnumerable<ExceptionDetailViewModel>>(ExceptionDetailManager.GetExceptionDetails());
        }

        [HttpGet]
        public ExceptionDetailViewModel Get(int id)
        {
            return Mapper.Map<ExceptionDetailTransport, ExceptionDetailViewModel>(ExceptionDetailManager.GetExceptionDetail(id));
        }
    }
}