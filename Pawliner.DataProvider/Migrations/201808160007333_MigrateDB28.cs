namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB28 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Executors", "Status", c => c.Int(nullable: false));
            AddColumn("dbo.Executors", "DocumentId", c => c.Int());
            AddColumn("dbo.Documents", "FileName", c => c.String());
            AlterColumn("dbo.Executors", "FirstName", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Executors", "Patronymic", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Executors", "LastName", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Executors", "PhoneNumber", c => c.String(maxLength: 32));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Executors", "PhoneNumber", c => c.String());
            AlterColumn("dbo.Executors", "LastName", c => c.String(nullable: false));
            AlterColumn("dbo.Executors", "Patronymic", c => c.String(nullable: false));
            AlterColumn("dbo.Executors", "FirstName", c => c.String(nullable: false));
            DropColumn("dbo.Documents", "FileName");
            DropColumn("dbo.Executors", "DocumentId");
            DropColumn("dbo.Executors", "Status");
        }
    }
}
