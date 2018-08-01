namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Services", "Id", "dbo.Orders");
            DropForeignKey("dbo.ServiceExecutors", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services");
            DropIndex("dbo.Services", new[] { "Id" });
            DropPrimaryKey("dbo.Services");
            CreateTable(
                "dbo.ServiceOrders",
                c => new
                    {
                        Service_Id = c.Int(nullable: false),
                        Order_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Service_Id, t.Order_Id })
                .ForeignKey("dbo.Services", t => t.Service_Id, cascadeDelete: true)
                .ForeignKey("dbo.Orders", t => t.Order_Id, cascadeDelete: true)
                .Index(t => t.Service_Id)
                .Index(t => t.Order_Id);
            
            AlterColumn("dbo.Services", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Services", "Id");
            AddForeignKey("dbo.ServiceExecutors", "Service_Id", "dbo.Services", "Id", cascadeDelete: true);
            AddForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.ServiceExecutors", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.ServiceOrders", "Order_Id", "dbo.Orders");
            DropForeignKey("dbo.ServiceOrders", "Service_Id", "dbo.Services");
            DropIndex("dbo.ServiceOrders", new[] { "Order_Id" });
            DropIndex("dbo.ServiceOrders", new[] { "Service_Id" });
            DropPrimaryKey("dbo.Services");
            AlterColumn("dbo.Services", "Id", c => c.Int(nullable: false));
            DropTable("dbo.ServiceOrders");
            AddPrimaryKey("dbo.Services", "Id");
            CreateIndex("dbo.Services", "Id");
            AddForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services", "Id");
            AddForeignKey("dbo.ServiceExecutors", "Service_Id", "dbo.Services", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Services", "Id", "dbo.Orders", "Id");
        }
    }
}
