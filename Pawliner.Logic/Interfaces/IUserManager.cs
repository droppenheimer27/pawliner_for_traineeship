using System;

namespace Pawliner.Logic
{
    public interface IUserManager
    {
        UserTransport GetUserTransport(int? id);
        void Dispose();
    }
}
