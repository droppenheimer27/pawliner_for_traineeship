namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB22 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ExceptionDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ExceptionMessage = c.String(nullable: false),
                        ControllerName = c.String(nullable: false),
                        ActionName = c.String(nullable: false),
                        StackTrace = c.String(nullable: false),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Executors", "PhoneNumber", c => c.String());
            AlterColumn("dbo.Executors", "Description", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Executors", "Description", c => c.String(nullable: false, maxLength: 1024));
            DropColumn("dbo.Executors", "PhoneNumber");
            DropTable("dbo.ExceptionDetails");
        }
    }
}
