namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Photos", "Executor_Id", "dbo.Executors");
            DropForeignKey("dbo.Photos", "Order_Id", "dbo.Orders");
            DropForeignKey("dbo.Services", "Executor_Id", "dbo.Executors");
            DropIndex("dbo.Documents", new[] { "Id" });
            DropIndex("dbo.JuridicalExecutors", new[] { "Id" });
            DropIndex("dbo.NaturalExecutors", new[] { "Id" });
            DropIndex("dbo.Photos", new[] { "Executor_Id" });
            DropIndex("dbo.Photos", new[] { "Order_Id" });
            DropIndex("dbo.Services", new[] { "Executor_Id" });
            DropIndex("dbo.SoleTraderExecutors", new[] { "Id" });
            DropPrimaryKey("dbo.Documents");
            DropPrimaryKey("dbo.JuridicalExecutors");
            DropPrimaryKey("dbo.NaturalExecutors");
            DropPrimaryKey("dbo.SoleTraderExecutors");
            CreateTable(
                "dbo.PhotoExecutors",
                c => new
                    {
                        Photo_Id = c.Int(nullable: false),
                        Executor_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Photo_Id, t.Executor_Id })
                .ForeignKey("dbo.Photos", t => t.Photo_Id, cascadeDelete: true)
                .ForeignKey("dbo.Executors", t => t.Executor_Id, cascadeDelete: true)
                .Index(t => t.Photo_Id)
                .Index(t => t.Executor_Id);
            
            CreateTable(
                "dbo.OrderPhotoes",
                c => new
                    {
                        Order_Id = c.Int(nullable: false),
                        Photo_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Order_Id, t.Photo_Id })
                .ForeignKey("dbo.Orders", t => t.Order_Id, cascadeDelete: true)
                .ForeignKey("dbo.Photos", t => t.Photo_Id, cascadeDelete: true)
                .Index(t => t.Order_Id)
                .Index(t => t.Photo_Id);
            
            CreateTable(
                "dbo.ServiceExecutors",
                c => new
                    {
                        Service_Id = c.Int(nullable: false),
                        Executor_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Service_Id, t.Executor_Id })
                .ForeignKey("dbo.Services", t => t.Service_Id, cascadeDelete: true)
                .ForeignKey("dbo.Executors", t => t.Executor_Id, cascadeDelete: true)
                .Index(t => t.Service_Id)
                .Index(t => t.Executor_Id);
            
            AlterColumn("dbo.Documents", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.JuridicalExecutors", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.NaturalExecutors", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.SoleTraderExecutors", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Documents", "Id");
            AddPrimaryKey("dbo.JuridicalExecutors", "Id");
            AddPrimaryKey("dbo.NaturalExecutors", "Id");
            AddPrimaryKey("dbo.SoleTraderExecutors", "Id");
            CreateIndex("dbo.Documents", "Id");
            CreateIndex("dbo.JuridicalExecutors", "Id");
            CreateIndex("dbo.NaturalExecutors", "Id");
            CreateIndex("dbo.SoleTraderExecutors", "Id");
            DropColumn("dbo.Photos", "Executor_Id");
            DropColumn("dbo.Photos", "Order_Id");
            DropColumn("dbo.Services", "Executor_Id");
            DropColumn("dbo.ServiceClassifers", "ParentId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ServiceClassifers", "ParentId", c => c.Int(nullable: false));
            AddColumn("dbo.Services", "Executor_Id", c => c.Int());
            AddColumn("dbo.Photos", "Order_Id", c => c.Int());
            AddColumn("dbo.Photos", "Executor_Id", c => c.Int());
            DropForeignKey("dbo.ServiceExecutors", "Executor_Id", "dbo.Executors");
            DropForeignKey("dbo.ServiceExecutors", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.OrderPhotoes", "Photo_Id", "dbo.Photos");
            DropForeignKey("dbo.OrderPhotoes", "Order_Id", "dbo.Orders");
            DropForeignKey("dbo.PhotoExecutors", "Executor_Id", "dbo.Executors");
            DropForeignKey("dbo.PhotoExecutors", "Photo_Id", "dbo.Photos");
            DropIndex("dbo.ServiceExecutors", new[] { "Executor_Id" });
            DropIndex("dbo.ServiceExecutors", new[] { "Service_Id" });
            DropIndex("dbo.OrderPhotoes", new[] { "Photo_Id" });
            DropIndex("dbo.OrderPhotoes", new[] { "Order_Id" });
            DropIndex("dbo.PhotoExecutors", new[] { "Executor_Id" });
            DropIndex("dbo.PhotoExecutors", new[] { "Photo_Id" });
            DropIndex("dbo.SoleTraderExecutors", new[] { "Id" });
            DropIndex("dbo.NaturalExecutors", new[] { "Id" });
            DropIndex("dbo.JuridicalExecutors", new[] { "Id" });
            DropIndex("dbo.Documents", new[] { "Id" });
            DropPrimaryKey("dbo.SoleTraderExecutors");
            DropPrimaryKey("dbo.NaturalExecutors");
            DropPrimaryKey("dbo.JuridicalExecutors");
            DropPrimaryKey("dbo.Documents");
            AlterColumn("dbo.SoleTraderExecutors", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.NaturalExecutors", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.JuridicalExecutors", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Documents", "Id", c => c.Int(nullable: false));
            DropTable("dbo.ServiceExecutors");
            DropTable("dbo.OrderPhotoes");
            DropTable("dbo.PhotoExecutors");
            AddPrimaryKey("dbo.SoleTraderExecutors", "Id");
            AddPrimaryKey("dbo.NaturalExecutors", "Id");
            AddPrimaryKey("dbo.JuridicalExecutors", "Id");
            AddPrimaryKey("dbo.Documents", "Id");
            CreateIndex("dbo.SoleTraderExecutors", "Id");
            CreateIndex("dbo.Services", "Executor_Id");
            CreateIndex("dbo.Photos", "Order_Id");
            CreateIndex("dbo.Photos", "Executor_Id");
            CreateIndex("dbo.NaturalExecutors", "Id");
            CreateIndex("dbo.JuridicalExecutors", "Id");
            CreateIndex("dbo.Documents", "Id");
            AddForeignKey("dbo.Services", "Executor_Id", "dbo.Executors", "Id");
            AddForeignKey("dbo.Photos", "Order_Id", "dbo.Orders", "Id");
            AddForeignKey("dbo.Photos", "Executor_Id", "dbo.Executors", "Id");
        }
    }
}
