using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace Pawliner.DataProvider
{
    public class UserRepository : IRepository<User>
    {
        private ApplicationContext database;

        public UserRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(User item)
        {
            database.Users.Add(item);
        }

        public void Delete(int id)
        {
            var user = database.Users.Find(id);
            if (user != null)
            {
                database.Users.Remove(user);
            }
        }

        public void Update(User item)
        {
            database.Entry(item).State = EntityState.Modified;
        }

        public User Get(int id)
        {
            return database.Users.Find(id);
        }

        public IEnumerable<User> GetList()
        {
            return database.Users;
        }
    }
}



