using System.Collections.Generic;

namespace Pawliner.Logic
{
    public class CreateExecutorTransport
    {
        public string FirstName { get; set; }
        public string Patronymic { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }
        public string Type { get; set; }
        public string UserId { get; set; }
        public string FullJuredicalName { get; set; }
        public string ShortJuredicalName { get; set; }
        public int PayerAccountNumber { get; set; }
        public List<string> ServiceClassifersIds { get; set; }
    }
}
