namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB19 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Content = c.String(nullable: false, maxLength: 512),
                        CreatedAt = c.String(nullable: false),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ExecutorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Executors", t => t.ExecutorId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.ExecutorId);
            
            AlterColumn("dbo.Executors", "Description", c => c.String(nullable: false, maxLength: 1024));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Comments", "ExecutorId", "dbo.Executors");
            DropIndex("dbo.Comments", new[] { "ExecutorId" });
            DropIndex("dbo.Comments", new[] { "UserId" });
            AlterColumn("dbo.Executors", "Description", c => c.String(nullable: false));
            DropTable("dbo.Comments");
        }
    }
}
