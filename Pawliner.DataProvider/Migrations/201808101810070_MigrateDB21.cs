namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB21 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Photos", "Header", c => c.String(nullable: false));
            AddColumn("dbo.AspNetUsers", "PhotoId", c => c.Int());
            AlterColumn("dbo.Photos", "Path", c => c.String(nullable: false));
            CreateIndex("dbo.AspNetUsers", "PhotoId");
            AddForeignKey("dbo.AspNetUsers", "PhotoId", "dbo.Photos", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "PhotoId", "dbo.Photos");
            DropIndex("dbo.AspNetUsers", new[] { "PhotoId" });
            AlterColumn("dbo.Photos", "Path", c => c.String());
            DropColumn("dbo.AspNetUsers", "PhotoId");
            DropColumn("dbo.Photos", "Header");
        }
    }
}
