using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider
{
    [Table("users")]
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("user_id")]
        public int Id { get; set; }
        [Column("user_name")]
        public string Name { get; set; }
        [Column("user_email")]
        public string Email { get; set; }
        [Column("user_passhash")]
        public string Passhash { get; set; }
        [Column("user_created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("user_last_login")]
        public DateTime LastLogin { get; set; }
        [Column("user_last_ip")]
        public string IP { get; set; }
    }
}
