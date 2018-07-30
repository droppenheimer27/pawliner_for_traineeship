using System;

namespace Pawliner.Model
{
    public class UserViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Passhash { get; set; }
        public string Skype { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastLogin { get; set; }
        public string IP { get; set; }
    }
}
