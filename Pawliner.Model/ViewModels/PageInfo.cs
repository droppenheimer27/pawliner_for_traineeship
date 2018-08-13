using System;

namespace Pawliner.Model
{
    public class PageInfo
    {
        public int currentPage { get; set; } 
        public int perPage { get; set; } 
        public int totalCount { get; set; } 
        public int pageCount  
        {
            get { return (int)Math.Ceiling((decimal)totalCount / perPage); }
        }
    }
}
