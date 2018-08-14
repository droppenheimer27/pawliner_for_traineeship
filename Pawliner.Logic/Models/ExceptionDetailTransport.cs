using System;

namespace Pawliner.Logic
{
    public class ExceptionDetailTransport
    {
        public int Id { get; set; }
        public string ExceptionMessage { get; set; }
        public string ControllerName { get; set; }
        public string StackTrace { get; set; }
        public DateTime Date { get; set; }
    }
}
