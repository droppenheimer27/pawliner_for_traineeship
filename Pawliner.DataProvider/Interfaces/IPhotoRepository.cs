using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public interface IPhotoRepository<T>
    {
        IEnumerable<T> GetList();
        T Get(string id);
        void Create(T item);
        void Update(T item);
        void Delete(string id);
    }
}
