using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class UserRepository : IUserRepository<User>
    {
        protected ApplicationContext database;

        public UserRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(User item)
        {
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public User Get(string id)
        {
            return database.Users.Find(id);
        }

        public IEnumerable<User> GetList()
        {
            throw new NotImplementedException();
        }

        public void Update(User item)
        {
            throw new NotImplementedException();
        }
    }
}
