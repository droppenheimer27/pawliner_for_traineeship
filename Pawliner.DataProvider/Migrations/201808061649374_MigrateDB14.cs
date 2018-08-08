namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB14 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Executors", "UserId", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Executors", "UserId");
        }
    }
}
