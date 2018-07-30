namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB7 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Orders", "CompletedOn", c => c.String(nullable: false));
            AlterColumn("dbo.Orders", "CreatedAt", c => c.String());
            AlterColumn("dbo.Orders", "UpdatedAt", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Orders", "UpdatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Orders", "CreatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Orders", "CompletedOn", c => c.DateTime(nullable: false));
        }
    }
}
