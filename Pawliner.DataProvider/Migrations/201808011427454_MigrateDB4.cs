namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB4 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ServiceOrders", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.ServiceOrders", "Order_Id", "dbo.Orders");
            DropIndex("dbo.ServiceOrders", new[] { "Service_Id" });
            DropIndex("dbo.ServiceOrders", new[] { "Order_Id" });
            AddColumn("dbo.Orders", "Status", c => c.Int(nullable: false));
            AddColumn("dbo.Orders", "ServiceId", c => c.Int());
            CreateIndex("dbo.Orders", "ServiceId");
            AddForeignKey("dbo.Orders", "ServiceId", "dbo.Services", "Id");
            DropTable("dbo.ServiceOrders");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ServiceOrders",
                c => new
                    {
                        Service_Id = c.Int(nullable: false),
                        Order_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Service_Id, t.Order_Id });
            
            DropForeignKey("dbo.Orders", "ServiceId", "dbo.Services");
            DropIndex("dbo.Orders", new[] { "ServiceId" });
            DropColumn("dbo.Orders", "ServiceId");
            DropColumn("dbo.Orders", "Status");
            CreateIndex("dbo.ServiceOrders", "Order_Id");
            CreateIndex("dbo.ServiceOrders", "Service_Id");
            AddForeignKey("dbo.ServiceOrders", "Order_Id", "dbo.Orders", "Id", cascadeDelete: true);
            AddForeignKey("dbo.ServiceOrders", "Service_Id", "dbo.Services", "Id", cascadeDelete: true);
        }
    }
}
