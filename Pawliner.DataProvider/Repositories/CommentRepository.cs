using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class CommentRepository : IRepository<Comment>
    {
        private ApplicationContext database;

        public CommentRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(Comment item)
        {
            database.Comments.Add(item);
        }

        public void Delete(int id)
        {
            var comment = database.Comments.Find(id);
            if (comment != null)
            {
                database.Comments.Remove(comment);
            }
        }

        public Comment Get(int? id)
        {
            return database.Comments.Find(id);
        }

        public IEnumerable<Comment> GetList()
        {
            return database.Comments;
        }

        public void Update(Comment item)
        {
            database.Entry(item).State = EntityState.Modified;
        }
    }
}
