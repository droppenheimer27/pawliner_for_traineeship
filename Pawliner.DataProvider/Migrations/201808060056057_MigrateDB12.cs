namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB12 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Orders", "ServiceClassiferId", "dbo.ServiceClassifers");
            DropIndex("dbo.Documents", new[] { "Id" });
            DropIndex("dbo.Orders", new[] { "ServiceClassiferId" });
            DropPrimaryKey("dbo.Documents");
            AddColumn("dbo.Executors", "User_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.Documents", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Orders", "ServiceClassiferId", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Documents", "Id");
            CreateIndex("dbo.Documents", "Id");
            CreateIndex("dbo.Executors", "User_Id");
            CreateIndex("dbo.Orders", "ServiceClassiferId");
            AddForeignKey("dbo.Executors", "User_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.Orders", "ServiceClassiferId", "dbo.ServiceClassifers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "ServiceClassiferId", "dbo.ServiceClassifers");
            DropForeignKey("dbo.Executors", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Orders", new[] { "ServiceClassiferId" });
            DropIndex("dbo.Executors", new[] { "User_Id" });
            DropIndex("dbo.Documents", new[] { "Id" });
            DropPrimaryKey("dbo.Documents");
            AlterColumn("dbo.Orders", "ServiceClassiferId", c => c.Int());
            AlterColumn("dbo.Documents", "Id", c => c.Int(nullable: false, identity: true));
            DropColumn("dbo.Executors", "User_Id");
            AddPrimaryKey("dbo.Documents", "Id");
            CreateIndex("dbo.Orders", "ServiceClassiferId");
            CreateIndex("dbo.Documents", "Id");
            AddForeignKey("dbo.Orders", "ServiceClassiferId", "dbo.ServiceClassifers", "Id");
        }
    }
}
