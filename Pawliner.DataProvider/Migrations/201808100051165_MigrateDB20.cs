namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB20 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Responds", "ExecutorId", "dbo.Executors");
            DropIndex("dbo.Responds", new[] { "ExecutorId" });
            AlterColumn("dbo.Responds", "ExecutorId", c => c.Int(nullable: false));
            CreateIndex("dbo.Responds", "ExecutorId");
            AddForeignKey("dbo.Responds", "ExecutorId", "dbo.Executors", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Responds", "ExecutorId", "dbo.Executors");
            DropIndex("dbo.Responds", new[] { "ExecutorId" });
            AlterColumn("dbo.Responds", "ExecutorId", c => c.Int());
            CreateIndex("dbo.Responds", "ExecutorId");
            AddForeignKey("dbo.Responds", "ExecutorId", "dbo.Executors", "Id");
        }
    }
}
