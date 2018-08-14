using System.Collections.Generic;
using System.Data.Entity;

namespace Pawliner.DataProvider
{
    public class ExceptionDetailRepository : IRepository<ExceptionDetail>
    {
        private ApplicationContext database;

        public ExceptionDetailRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(ExceptionDetail item)
        {
            database.ExceptionDetails.Add(item);
        }

        public void Delete(int id)
        {
            var exceptionDetail = database.ExceptionDetails.Find(id);
            if (exceptionDetail != null)
            {
                database.ExceptionDetails.Remove(exceptionDetail);
            }
        }

        public ExceptionDetail Get(int? id)
        {
            return database.ExceptionDetails.Find(id);
        }

        public IEnumerable<ExceptionDetail> GetList()
        {
            return database.ExceptionDetails;
        }

        public void Update(ExceptionDetail item)
        {
            database.Entry(item).State = EntityState.Modified;
        }
    }
}
