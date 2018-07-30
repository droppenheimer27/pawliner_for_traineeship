namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "FullName", c => c.String());
            AddColumn("dbo.AspNetUsers", "Skype", c => c.String());
            AddColumn("dbo.AspNetUsers", "Birthday", c => c.DateTime(nullable: false));
            DropColumn("dbo.AspNetUsers", "UserLastIP");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "UserLastIP", c => c.String());
            DropColumn("dbo.AspNetUsers", "Birthday");
            DropColumn("dbo.AspNetUsers", "Skype");
            DropColumn("dbo.AspNetUsers", "FullName");
        }
    }
}
