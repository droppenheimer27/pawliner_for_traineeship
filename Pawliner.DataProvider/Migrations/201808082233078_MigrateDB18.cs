namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB18 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Responds", "OrderId", "dbo.Orders");
            DropIndex("dbo.Responds", new[] { "OrderId" });
            AlterColumn("dbo.Responds", "OrderId", c => c.Int(nullable: false));
            CreateIndex("dbo.Responds", "OrderId");
            AddForeignKey("dbo.Responds", "OrderId", "dbo.Orders", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Responds", "OrderId", "dbo.Orders");
            DropIndex("dbo.Responds", new[] { "OrderId" });
            AlterColumn("dbo.Responds", "OrderId", c => c.Int());
            CreateIndex("dbo.Responds", "OrderId");
            AddForeignKey("dbo.Responds", "OrderId", "dbo.Orders", "Id");
        }
    }
}
