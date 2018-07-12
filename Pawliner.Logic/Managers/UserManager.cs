using System;
using Pawliner.DataProvider;

namespace Pawliner.Logic
{
    public class UserManager : IUserManager
    {
        IUnitOfWork database { get; set; }

        public UserManager(IUnitOfWork database)
        {
            this.database = database;
        }

        public UserTransport GetUserTransport(int? id)
        {
            if (id == null)
            {
                throw new Exception("User id not found");
            }

            var user = database.Users.Get(id.Value);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            return new UserTransport
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Passhash = user.Passhash,
                CreatedAt = user.CreatedAt,
                LastLogin = user.LastLogin,
                IP = user.IP
            };
        }

        public void Dispose()
        {
            database.Dispose();
        }
    }
}
