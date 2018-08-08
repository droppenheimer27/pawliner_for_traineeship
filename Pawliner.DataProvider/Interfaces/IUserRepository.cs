using System;
using System.Collections.Generic;

namespace Pawliner.DataProvider
{
    public interface IUserRepository<T> where T : class
    {
        IEnumerable<T> GetList();
        T Get(string id);
        void Create(T item);
        void Update(T item);
        void Delete(string id);
    }
}
