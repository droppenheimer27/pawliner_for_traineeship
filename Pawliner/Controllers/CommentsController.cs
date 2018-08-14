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
    [Authorize]
    public class CommentsController : ApiController
    {
        protected ICommentManager commentManager;

        public ICommentManager CommentManager
        {
            get { return commentManager; }
            set { commentManager = value; }
        }

        public CommentsController(ICommentManager commentManager)
        {
            CommentManager = commentManager;
        }

        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<CommentViewModel> Get()
        {
            return Mapper.Map<IEnumerable<CommentTransport>, IEnumerable<CommentViewModel>>(CommentManager.GetComments());
        }

        [AllowAnonymous]
        [HttpGet]
        public CommentViewModel Get(int id)
        {
            return Mapper.Map<CommentTransport, CommentViewModel>(CommentManager.GetComment(id));
        }

        [HttpPost]
        public IHttpActionResult Post(CommentViewModel model)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var comment = Mapper.Map<CommentViewModel, CommentTransport>(model);
            CommentManager.CreateComment(comment);

            return Ok();
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]EditCommentViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CommentManager.UpdateComment(new EditCommentTransport
            {
                Id = model.Id,
                Content = model.Content
            });

            return Ok();
        }

        [HttpDelete]
        public void Delete(int id)
        {
            CommentManager.DeleteComment(id);
        }
    }
}