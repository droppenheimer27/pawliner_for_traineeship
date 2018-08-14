namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB23 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ExceptionDetails", "ActionName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ExceptionDetails", "ActionName", c => c.String(nullable: false));
        }
    }
}
