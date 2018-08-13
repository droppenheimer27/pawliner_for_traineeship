using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pawliner.DataProvider
{
    public class PhotoRepository : IPhotoRepository<Photo>
    {
        private ApplicationContext database;

        public PhotoRepository(ApplicationContext database)
        {
            this.database = database;
        }

        public void Create(Photo item)
        {
            database.Photos.Add(item);
        }

        public void Delete(string id)
        {
            var photo = database.Photos.Find(id);
            if (photo != null)
            {
                database.Photos.Remove(photo);
            }
        }

        public Photo Get(string id)
        {
            return database.Photos.Find(id);
        }

        public IEnumerable<Photo> GetList()
        {
            return database.Photos;
        }

        public void Update(Photo item)
        {
            database.Entry(item).State = EntityState.Modified;
        }
    }
}
