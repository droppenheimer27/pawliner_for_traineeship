﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Pawliner.DataProvider
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public string Skype { get; set; }
        public int? PhotoId { get; set; }
        public virtual Photo Photo { get; set; }
        public ICollection<Executor> Executors { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Comment> Comments { get; set; }

        public User()
        {
            Orders = new List<Order>();
            Executors = new List<Executor>();
            Comments = new List<Comment>();
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);

            return userIdentity;
        }
    }
}
