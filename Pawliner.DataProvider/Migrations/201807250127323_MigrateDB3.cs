namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Documents", "UserId", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Documents", "Picture", c => c.Binary(nullable: false));
            AlterColumn("dbo.Executors", "ExecutorType", c => c.String(nullable: false));
            AlterColumn("dbo.Executors", "FirstName", c => c.String(nullable: false));
            AlterColumn("dbo.Executors", "MiddleName", c => c.String(nullable: false));
            AlterColumn("dbo.Executors", "LastName", c => c.String(nullable: false));
            AlterColumn("dbo.Executors", "UNP", c => c.String(nullable: false));
            AlterColumn("dbo.Executors", "Description", c => c.String(nullable: false));
            AlterColumn("dbo.Orders", "UserId", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Orders", "Header", c => c.String(nullable: false, maxLength: 32));
            AlterColumn("dbo.Orders", "Description", c => c.String(nullable: false));
            AlterColumn("dbo.Orders", "City", c => c.String(nullable: false));
            AlterColumn("dbo.Orders", "Name", c => c.String(nullable: false, maxLength: 32));
            AlterColumn("dbo.Orders", "PhoneNumber", c => c.String(nullable: false));
            AlterColumn("dbo.Services", "Description", c => c.String(nullable: false));
            CreateIndex("dbo.Documents", "UserId");
            CreateIndex("dbo.Executors", "ServiceId");
            CreateIndex("dbo.Services", "ServiceClassiferId");
            CreateIndex("dbo.Orders", "UserId");
            CreateIndex("dbo.Orders", "ServiceId");
            AddForeignKey("dbo.Documents", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Services", "ServiceClassiferId", "dbo.ServiceClassifers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Executors", "ServiceId", "dbo.Services", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Orders", "ServiceId", "dbo.Services");
            DropForeignKey("dbo.Executors", "ServiceId", "dbo.Services");
            DropForeignKey("dbo.Services", "ServiceClassiferId", "dbo.ServiceClassifers");
            DropForeignKey("dbo.Documents", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Orders", new[] { "ServiceId" });
            DropIndex("dbo.Orders", new[] { "UserId" });
            DropIndex("dbo.Services", new[] { "ServiceClassiferId" });
            DropIndex("dbo.Executors", new[] { "ServiceId" });
            DropIndex("dbo.Documents", new[] { "UserId" });
            AlterColumn("dbo.Services", "Description", c => c.String());
            AlterColumn("dbo.Orders", "PhoneNumber", c => c.String());
            AlterColumn("dbo.Orders", "Name", c => c.String());
            AlterColumn("dbo.Orders", "City", c => c.String());
            AlterColumn("dbo.Orders", "Description", c => c.String());
            AlterColumn("dbo.Orders", "Header", c => c.String());
            AlterColumn("dbo.Orders", "UserId", c => c.String());
            AlterColumn("dbo.Executors", "Description", c => c.String());
            AlterColumn("dbo.Executors", "UNP", c => c.String());
            AlterColumn("dbo.Executors", "LastName", c => c.String());
            AlterColumn("dbo.Executors", "MiddleName", c => c.String());
            AlterColumn("dbo.Executors", "FirstName", c => c.String());
            AlterColumn("dbo.Executors", "ExecutorType", c => c.String());
            AlterColumn("dbo.Documents", "Picture", c => c.Binary());
            AlterColumn("dbo.Documents", "UserId", c => c.Int(nullable: false));
        }
    }
}
