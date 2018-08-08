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
    [Authorize]
    public class RespondsController : ApiController
    {
        protected IRespondManager respondManager;

        public RespondsController(IRespondManager respondManager)
        {
            RespondManager = respondManager;
        }

        public IRespondManager RespondManager
        {
            get { return respondManager; }
            set { respondManager = value; }
        }

        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<RespondViewModel> Get()
        {
            return Mapper.Map<IEnumerable<RespondTransport>, IEnumerable<RespondViewModel>>(RespondManager.GetResponds());
        }

        [AllowAnonymous]
        [HttpGet]
        public RespondViewModel Get(int id)
        {
            return Mapper.Map<RespondTransport, RespondViewModel>(RespondManager.GetRespond(id));
        }

        [Authorize(Roles = "Executor")]
        [HttpPost]
        public IHttpActionResult Post(RespondViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var respond = Mapper.Map<RespondViewModel, RespondTransport>(model);
            RespondManager.CreateRespond(respond);

            return Ok();
        }

        [Authorize(Roles = "Executor")]
        [HttpPut]
        public void Put(int id, [FromBody]EditRespondViewModel model)
        {
            var respond = Mapper.Map<EditRespondViewModel, EditRespondTransport>(model);
            RespondManager.UpdateRespond(respond);
        }
        [Authorize(Roles = "Executor")]
        [HttpDelete]
        public void Delete(int id)
        {
            RespondManager.DeleteRespond(id);
        }
    }
}