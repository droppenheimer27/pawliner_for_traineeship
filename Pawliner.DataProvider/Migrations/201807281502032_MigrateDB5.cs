namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB5 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Orders", "Header", c => c.String(nullable: false, maxLength: 128));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Orders", "Header", c => c.String(nullable: false, maxLength: 32));
        }
    }
}
