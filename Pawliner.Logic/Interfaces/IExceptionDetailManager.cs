using System.Collections.Generic;

namespace Pawliner.Logic
{
    public interface IExceptionDetailManager
    {
        void CreateExceptionDetail(ExceptionDetailTransport model);
        void UpdateExceptionDetail(ExceptionDetailTransport model);
        void DeleteExceptionDetail(int id);
        ExceptionDetailTransport GetExceptionDetail(int id);
        IEnumerable<ExceptionDetailTransport> GetExceptionDetails();
    }
}
