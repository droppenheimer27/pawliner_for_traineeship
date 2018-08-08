namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB15 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Executors", new[] { "User_Id" });
            DropColumn("dbo.Executors", "UserId");
            RenameColumn(table: "dbo.Executors", name: "User_Id", newName: "UserId");
            AlterColumn("dbo.Executors", "UserId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Executors", "UserId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Executors", new[] { "UserId" });
            AlterColumn("dbo.Executors", "UserId", c => c.Int());
            RenameColumn(table: "dbo.Executors", name: "UserId", newName: "User_Id");
            AddColumn("dbo.Executors", "UserId", c => c.Int());
            CreateIndex("dbo.Executors", "User_Id");
        }
    }
}
