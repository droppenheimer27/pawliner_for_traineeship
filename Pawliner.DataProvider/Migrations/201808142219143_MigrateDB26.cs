namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB26 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services");
            DropPrimaryKey("dbo.Services");
            AlterColumn("dbo.Services", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Services", "Id");
            AddForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services");
            DropPrimaryKey("dbo.Services");
            AlterColumn("dbo.Services", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Services", "Id");
            AddForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services", "Id");
        }
    }
}
