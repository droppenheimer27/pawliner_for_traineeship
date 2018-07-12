using System;

namespace Pawliner.Logic
{
    public class UserTransport
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Passhash { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastLogin { get; set; }
        public string IP { get; set; }
    }
}
