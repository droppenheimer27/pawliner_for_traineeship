using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Pawliner.Logic;
using Pawliner.Model;

namespace Pawliner.Controllers
{
    public class HomeController : Controller
    {
        IApplicationUserManager userManager;

        public HomeController()
        { }

        public HomeController(IApplicationUserManager userManager)
        {
            this.userManager = userManager;
        }

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            //var userTransport = userManager.GetUser(1);
            //var user = new UserViewModel
            //{
            //    Name = userTransport.Name,
            //    Email = userTransport.Email,
            //    Passhash = userTransport.Passhash,
            //    CreatedAt = userTransport.CreatedAt,
            //    LastLogin = userTransport.LastLogin,
            //    IP = userTransport.IP
            //};

            return View();
        }
    }
}
