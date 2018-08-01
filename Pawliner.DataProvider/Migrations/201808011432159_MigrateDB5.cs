namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB5 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "ServiceClassiferId", c => c.Int());
            CreateIndex("dbo.Orders", "ServiceClassiferId");
            AddForeignKey("dbo.Orders", "ServiceClassiferId", "dbo.ServiceClassifers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "ServiceClassiferId", "dbo.ServiceClassifers");
            DropIndex("dbo.Orders", new[] { "ServiceClassiferId" });
            DropColumn("dbo.Orders", "ServiceClassiferId");
        }
    }
}
