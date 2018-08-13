using System;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Http.Filters;

namespace Pawliner
{ 
    [AttributeUsage(AttributeTargets.All)]
    public class ExceptionHandlerAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception != null)
            {
                using (var fstream = new StreamWriter(HttpContext.Current.Server.MapPath("~/Logs/exceptions.json"), true, Encoding.Default))
                {
                    fstream.WriteLine(context.Exception);
                }
            }
        }
    }
}