namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB11 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Responds",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Content = c.String(nullable: false, maxLength: 512),
                        CreatedAt = c.String(nullable: false),
                        Status = c.Int(nullable: false),
                        Executor_Id = c.Int(),
                        Order_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Executors", t => t.Executor_Id)
                .ForeignKey("dbo.Orders", t => t.Order_Id)
                .Index(t => t.Executor_Id)
                .Index(t => t.Order_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Responds", "Order_Id", "dbo.Orders");
            DropForeignKey("dbo.Responds", "Executor_Id", "dbo.Executors");
            DropIndex("dbo.Responds", new[] { "Order_Id" });
            DropIndex("dbo.Responds", new[] { "Executor_Id" });
            DropTable("dbo.Responds");
        }
    }
}
