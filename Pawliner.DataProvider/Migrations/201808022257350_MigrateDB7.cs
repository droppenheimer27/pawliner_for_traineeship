namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB7 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ServiceExecutors", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.ServiceExecutors", "Executor_Id", "dbo.Executors");
            DropIndex("dbo.ServiceExecutors", new[] { "Service_Id" });
            DropIndex("dbo.ServiceExecutors", new[] { "Executor_Id" });
            AddColumn("dbo.Executors", "ServiceClassiferId", c => c.Int());
            AddColumn("dbo.Services", "Executor_Id", c => c.Int());
            CreateIndex("dbo.Executors", "ServiceClassiferId");
            CreateIndex("dbo.Services", "Executor_Id");
            AddForeignKey("dbo.Executors", "ServiceClassiferId", "dbo.ServiceClassifers", "Id");
            AddForeignKey("dbo.Services", "Executor_Id", "dbo.Executors", "Id");
            DropColumn("dbo.Executors", "UpdatedAt");
            DropTable("dbo.ServiceExecutors");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ServiceExecutors",
                c => new
                    {
                        Service_Id = c.Int(nullable: false),
                        Executor_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Service_Id, t.Executor_Id });
            
            AddColumn("dbo.Executors", "UpdatedAt", c => c.DateTime(nullable: false));
            DropForeignKey("dbo.Services", "Executor_Id", "dbo.Executors");
            DropForeignKey("dbo.Executors", "ServiceClassiferId", "dbo.ServiceClassifers");
            DropIndex("dbo.Services", new[] { "Executor_Id" });
            DropIndex("dbo.Executors", new[] { "ServiceClassiferId" });
            DropColumn("dbo.Services", "Executor_Id");
            DropColumn("dbo.Executors", "ServiceClassiferId");
            CreateIndex("dbo.ServiceExecutors", "Executor_Id");
            CreateIndex("dbo.ServiceExecutors", "Service_Id");
            AddForeignKey("dbo.ServiceExecutors", "Executor_Id", "dbo.Executors", "Id", cascadeDelete: true);
            AddForeignKey("dbo.ServiceExecutors", "Service_Id", "dbo.Services", "Id", cascadeDelete: true);
        }
    }
}
