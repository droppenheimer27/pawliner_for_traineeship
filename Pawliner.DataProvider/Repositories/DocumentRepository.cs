using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class DocumentRepository : IRepository<Document>
    {
        private ApplicationContext database;

        public DocumentRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(Document item)
        {
            database.Documents.Add(item);
        }

        public void Delete(int id)
        {
            var document = database.Documents.Find(id);
            if (document != null)
            {
                database.Documents.Remove(document);
            }
        }

        public Document Get(int? id)
        {
            return database.Documents.Find(id);
        }

        public IEnumerable<Document> GetList()
        {
            return database.Documents;
        }

        public void Update(Document item)
        {
            database.Entry(item).State = EntityState.Modified;
        }
    }
}
