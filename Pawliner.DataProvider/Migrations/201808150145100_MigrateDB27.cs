namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB27 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services");
            DropIndex("dbo.ServiceClassifers", new[] { "Service_Id" });
            AlterColumn("dbo.ServiceClassifers", "Service_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.ServiceClassifers", "Service_Id");
            AddForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services");
            DropIndex("dbo.ServiceClassifers", new[] { "Service_Id" });
            AlterColumn("dbo.ServiceClassifers", "Service_Id", c => c.Int());
            CreateIndex("dbo.ServiceClassifers", "Service_Id");
            AddForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services", "Id");
        }
    }
}
