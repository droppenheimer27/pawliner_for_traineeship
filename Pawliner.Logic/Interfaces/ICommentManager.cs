using System;
using System.Collections.Generic;

namespace Pawliner.Logic
{
    public interface ICommentManager
    {
        void CreateComment(CommentTransport Comment);
        void UpdateComment(CommentTransport Comment);
        void DeleteComment(int id);
        CommentTransport GetComment(int id);
        IEnumerable<CommentTransport> GetComments();
    }
}
