namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB8 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Executors", "ServiceClassiferId", "dbo.ServiceClassifers");
            DropForeignKey("dbo.Services", "Executor_Id", "dbo.Executors");
            DropIndex("dbo.Executors", new[] { "ServiceClassiferId" });
            DropIndex("dbo.Services", new[] { "Executor_Id" });
            CreateTable(
                "dbo.ServiceClassiferExecutors",
                c => new
                    {
                        ServiceClassifer_Id = c.Int(nullable: false),
                        Executor_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ServiceClassifer_Id, t.Executor_Id })
                .ForeignKey("dbo.ServiceClassifers", t => t.ServiceClassifer_Id, cascadeDelete: true)
                .ForeignKey("dbo.Executors", t => t.Executor_Id, cascadeDelete: true)
                .Index(t => t.ServiceClassifer_Id)
                .Index(t => t.Executor_Id);
            
            DropColumn("dbo.Executors", "ServiceClassiferId");
            DropColumn("dbo.Services", "Executor_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Services", "Executor_Id", c => c.Int());
            AddColumn("dbo.Executors", "ServiceClassiferId", c => c.Int());
            DropForeignKey("dbo.ServiceClassiferExecutors", "Executor_Id", "dbo.Executors");
            DropForeignKey("dbo.ServiceClassiferExecutors", "ServiceClassifer_Id", "dbo.ServiceClassifers");
            DropIndex("dbo.ServiceClassiferExecutors", new[] { "Executor_Id" });
            DropIndex("dbo.ServiceClassiferExecutors", new[] { "ServiceClassifer_Id" });
            DropTable("dbo.ServiceClassiferExecutors");
            CreateIndex("dbo.Services", "Executor_Id");
            CreateIndex("dbo.Executors", "ServiceClassiferId");
            AddForeignKey("dbo.Services", "Executor_Id", "dbo.Executors", "Id");
            AddForeignKey("dbo.Executors", "ServiceClassiferId", "dbo.ServiceClassifers", "Id");
        }
    }
}
