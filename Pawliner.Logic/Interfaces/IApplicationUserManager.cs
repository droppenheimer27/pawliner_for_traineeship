using Pawliner.DataProvider;
using System;

namespace Pawliner.Logic
{
    public interface IApplicationUserManager
    {
        User CreateUser(string UserName, string Email, string PasswordHash);
        void Dispose();
    }
}
