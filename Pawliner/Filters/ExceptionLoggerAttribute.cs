using System;
using System.Web.Http.Filters;
using System.Web.Mvc;
using AutoMapper;
using Pawliner.DataProvider;
using Pawliner.Logic;
using Pawliner.Model;

namespace Pawliner
{
    public class ExceptionLoggerAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext filterContext)
        {
            var exceptionDetailViewModel = new ExceptionDetailViewModel()
            {
                ExceptionMessage = filterContext.Exception.Message,
                StackTrace = filterContext.Exception.StackTrace,
                ControllerName = filterContext.ActionContext.ControllerContext.Controller.ToString(),
                Date = DateTime.Now
            };

            //IExceptionDetailManager exceptionDetailManager = new ExceptionDetailManager(new UnitOfWork(new ApplicationContext("DefaultConnection")));
            var exceptionDetailManager = DependencyResolver.Current.GetService<IExceptionDetailManager>();

            var exceptionDetail = Mapper.Map<ExceptionDetailViewModel, ExceptionDetailTransport>(exceptionDetailViewModel);
            exceptionDetailManager.CreateExceptionDetail(exceptionDetail);
        }
    }
}
