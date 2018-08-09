using AutoMapper;
using Pawliner.DataProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.Logic
{
    public class CommentManager : ICommentManager
    {
        IUnitOfWork database;

        public CommentManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public void CreateComment(CommentTransport model)
        {
            model.CreatedAt = DateTime.UtcNow.ToString("d");
            var comment = Mapper.Map<CommentTransport, Comment>(model);

            database.Comments.Create(comment);
            database.Save();
        }

        public void DeleteComment(int id)
        {
            database.Comments.Delete(id);
            database.Save();
        }

        public CommentTransport GetComment(int id)
        {
            var comment = database.Comments.Get(id);
            return Mapper.Map<Comment, CommentTransport>(comment);
        }

        public IEnumerable<CommentTransport> GetComments()
        {
            var comments = Mapper.Map<IEnumerable<Comment>, List<CommentTransport>>(database.Comments
                .GetList()
                .OrderByDescending(o => o.Id));

            return comments;
        }

        public void UpdateComment(EditCommentTransport model)
        {
            var comment = database.Comments.Get(model.Id);
            comment.Content = model.Content;

            database.Comments.Update(comment);
            database.Save();
        }
    }
}
