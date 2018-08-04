namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB10 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Documents", "Path", c => c.String());
            AddColumn("dbo.Photos", "Path", c => c.String());
            DropColumn("dbo.Documents", "Picture");
            DropColumn("dbo.Photos", "Picture");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Photos", "Picture", c => c.Binary());
            AddColumn("dbo.Documents", "Picture", c => c.Binary());
            DropColumn("dbo.Photos", "Path");
            DropColumn("dbo.Documents", "Path");
        }
    }
}
