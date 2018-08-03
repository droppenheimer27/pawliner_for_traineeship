namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB9 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Executors", "ExecutorType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Executors", "ExecutorType");
        }
    }
}
