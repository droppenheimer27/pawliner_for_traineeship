using System.Collections.Generic;
using Pawliner.DataProvider;
using System.Linq;
using AutoMapper;

namespace Pawliner.Logic
{
    public class ExceptionDetailManager : IExceptionDetailManager
    {
        IUnitOfWork database;

        public ExceptionDetailManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public void CreateExceptionDetail(ExceptionDetailTransport model)
        {
            var exceptionDetail = Mapper.Map<ExceptionDetailTransport, ExceptionDetail>(model);
            database.ExceptionDetails.Create(exceptionDetail);
            database.Save();
        }

        public void DeleteExceptionDetail(int id)
        {
            database.ExceptionDetails.Delete(id);
            database.Save();
        }

        public ExceptionDetailTransport GetExceptionDetail(int id)
        {
            var exceptionDetail = database.ExceptionDetails.Get(id);
            return Mapper.Map<ExceptionDetail, ExceptionDetailTransport>(exceptionDetail);
        }

        public IEnumerable<ExceptionDetailTransport> GetExceptionDetails()
        {
            var exceptionDetails = Mapper.Map<IEnumerable<ExceptionDetail>, List<ExceptionDetailTransport>>(database.ExceptionDetails
                .GetList()
                .OrderByDescending(o => o.Id));

            return exceptionDetails;
        }

        public void UpdateExceptionDetail(ExceptionDetailTransport model)
        {
            var exceptionDetail = database.ExceptionDetails.Get(model.Id);
            exceptionDetail.ExceptionMessage = model.ExceptionMessage;
            exceptionDetail.ControllerName = model.ControllerName;
            exceptionDetail.Date = model.Date;

            database.ExceptionDetails.Update(exceptionDetail);
            database.Save();
        }
    }
}
