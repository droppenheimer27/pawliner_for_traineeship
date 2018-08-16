namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB29 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Executors", "DocumentId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Executors", "DocumentId", c => c.Int());
        }
    }
}
