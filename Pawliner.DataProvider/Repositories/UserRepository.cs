using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class UserRepository : IRepository<User>
    {
        private UserContext database;

        public UserRepository(UserContext database)
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

        public async Task SaveAsync()
        {
            await database.SaveChangesAsync();
        }
    }
}



