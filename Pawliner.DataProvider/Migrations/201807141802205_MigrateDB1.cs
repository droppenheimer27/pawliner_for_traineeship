namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "UserLastIP", c => c.String());
            DropColumn("dbo.AspNetUsers", "UserCreatedAt");
            DropColumn("dbo.AspNetUsers", "UserLastLogin");
            DropColumn("dbo.AspNetUsers", "UserIP");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "UserIP", c => c.String());
            AddColumn("dbo.AspNetUsers", "UserLastLogin", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "UserCreatedAt", c => c.DateTime(nullable: false));
            DropColumn("dbo.AspNetUsers", "UserLastIP");
        }
    }
}
