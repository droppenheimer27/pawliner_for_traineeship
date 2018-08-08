namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB16 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.JuridicalExecutors", new[] { "Id" });
            DropIndex("dbo.NaturalExecutors", new[] { "Id" });
            DropIndex("dbo.SoleTraderExecutors", new[] { "Id" });
            DropPrimaryKey("dbo.JuridicalExecutors");
            DropPrimaryKey("dbo.NaturalExecutors");
            DropPrimaryKey("dbo.SoleTraderExecutors");
            AlterColumn("dbo.JuridicalExecutors", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.NaturalExecutors", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.SoleTraderExecutors", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.JuridicalExecutors", "Id");
            AddPrimaryKey("dbo.NaturalExecutors", "Id");
            AddPrimaryKey("dbo.SoleTraderExecutors", "Id");
            CreateIndex("dbo.JuridicalExecutors", "Id");
            CreateIndex("dbo.NaturalExecutors", "Id");
            CreateIndex("dbo.SoleTraderExecutors", "Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.SoleTraderExecutors", new[] { "Id" });
            DropIndex("dbo.NaturalExecutors", new[] { "Id" });
            DropIndex("dbo.JuridicalExecutors", new[] { "Id" });
            DropPrimaryKey("dbo.SoleTraderExecutors");
            DropPrimaryKey("dbo.NaturalExecutors");
            DropPrimaryKey("dbo.JuridicalExecutors");
            AlterColumn("dbo.SoleTraderExecutors", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.NaturalExecutors", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.JuridicalExecutors", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.SoleTraderExecutors", "Id");
            AddPrimaryKey("dbo.NaturalExecutors", "Id");
            AddPrimaryKey("dbo.JuridicalExecutors", "Id");
            CreateIndex("dbo.SoleTraderExecutors", "Id");
            CreateIndex("dbo.NaturalExecutors", "Id");
            CreateIndex("dbo.JuridicalExecutors", "Id");
        }
    }
}
