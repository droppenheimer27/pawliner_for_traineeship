namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigratDB : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ServiceClassifers", "Service_Id", c => c.Int());
            CreateIndex("dbo.ServiceClassifers", "Service_Id");
            AddForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services");
            DropIndex("dbo.ServiceClassifers", new[] { "Service_Id" });
            DropColumn("dbo.ServiceClassifers", "Service_Id");
        }
    }
}
