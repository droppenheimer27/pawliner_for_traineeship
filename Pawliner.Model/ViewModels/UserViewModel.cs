using System.Collections.Generic;
using System.Web;

namespace Pawliner.Model
{
    public class UserViewModel
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Skype { get; set; }
        public string PhoneNumber { get; set; }
        public string AvatarPath { get; set; }
        public string PhotoId { get; set; }
        public int ExecutorId { get; set; }
        public ICollection<OrderViewModel> Orders { get; set; }
        public virtual PhotoViewModel Photo { get; set; }
        public HttpPostedFile Avatar { get; set; }
    }
}
