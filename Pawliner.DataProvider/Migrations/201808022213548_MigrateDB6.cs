namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB6 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Orders", "ServiceId", "dbo.Services");
            DropIndex("dbo.Orders", new[] { "ServiceId" });
            DropColumn("dbo.Orders", "ServiceId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Orders", "ServiceId", c => c.Int());
            CreateIndex("dbo.Orders", "ServiceId");
            AddForeignKey("dbo.Orders", "ServiceId", "dbo.Services", "Id");
        }
    }
}
