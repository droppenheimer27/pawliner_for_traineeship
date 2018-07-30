namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB6 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Services", "ServiceClassiferId", "dbo.ServiceClassifers");
            DropIndex("dbo.Services", new[] { "ServiceClassiferId" });
            DropColumn("dbo.Services", "ServiceClassiferId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Services", "ServiceClassiferId", c => c.Int(nullable: false));
            CreateIndex("dbo.Services", "ServiceClassiferId");
            AddForeignKey("dbo.Services", "ServiceClassiferId", "dbo.ServiceClassifers", "Id", cascadeDelete: true);
        }
    }
}
