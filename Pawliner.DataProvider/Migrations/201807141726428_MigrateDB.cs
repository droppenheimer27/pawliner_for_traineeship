namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.AspNetUsers", name: "user_created_at", newName: "UserCreatedAt");
            RenameColumn(table: "dbo.AspNetUsers", name: "user_last_login", newName: "UserLastLogin");
            RenameColumn(table: "dbo.AspNetUsers", name: "user_last_ip", newName: "UserIP");
        }
        
        public override void Down()
        {
            RenameColumn(table: "dbo.AspNetUsers", name: "UserIP", newName: "user_last_ip");
            RenameColumn(table: "dbo.AspNetUsers", name: "UserLastLogin", newName: "user_last_login");
            RenameColumn(table: "dbo.AspNetUsers", name: "UserCreatedAt", newName: "user_created_at");
        }
    }
}
