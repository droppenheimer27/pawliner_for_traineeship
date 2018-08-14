using System;

namespace Pawliner.Model
{
    public class ExceptionDetailViewModel
    {
        public int Id { get; set; }
        public string ExceptionMessage { get; set; } 
        public string ControllerName { get; set; }  
        public string StackTrace { get; set; }
        public DateTime Date { get; set; } 
    }
}
