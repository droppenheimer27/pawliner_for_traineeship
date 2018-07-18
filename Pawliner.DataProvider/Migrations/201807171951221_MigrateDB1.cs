namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Documents",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        Picture = c.Binary(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Executors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ServiceId = c.Int(nullable: false),
                        ExecutorType = c.String(),
                        FirstName = c.String(),
                        MiddleName = c.String(),
                        LastName = c.String(),
                        UNP = c.String(),
                        Description = c.String(),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ServiceClassifers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ParentId = c.Int(nullable: false),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Services",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ServiceClassiferId = c.Int(nullable: false),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Orders", "ServiceId", c => c.Int(nullable: false));
            AddColumn("dbo.Orders", "CompletedOn", c => c.DateTime(nullable: false));
            AddColumn("dbo.Orders", "CreatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.Orders", "UpdatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Orders", "Price", c => c.Int(nullable: false));
            DropColumn("dbo.Orders", "CompletionDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Orders", "CompletionDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Orders", "Price", c => c.Single(nullable: false));
            DropColumn("dbo.Orders", "UpdatedAt");
            DropColumn("dbo.Orders", "CreatedAt");
            DropColumn("dbo.Orders", "CompletedOn");
            DropColumn("dbo.Orders", "ServiceId");
            DropTable("dbo.Services");
            DropTable("dbo.ServiceClassifers");
            DropTable("dbo.Executors");
            DropTable("dbo.Documents");
        }
    }
}
