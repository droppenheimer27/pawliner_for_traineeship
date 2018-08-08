namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB13 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Responds", name: "Executor_Id", newName: "ExecutorId");
            RenameColumn(table: "dbo.Responds", name: "Order_Id", newName: "OrderId");
            RenameIndex(table: "dbo.Responds", name: "IX_Order_Id", newName: "IX_OrderId");
            RenameIndex(table: "dbo.Responds", name: "IX_Executor_Id", newName: "IX_ExecutorId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Responds", name: "IX_ExecutorId", newName: "IX_Executor_Id");
            RenameIndex(table: "dbo.Responds", name: "IX_OrderId", newName: "IX_Order_Id");
            RenameColumn(table: "dbo.Responds", name: "OrderId", newName: "Order_Id");
            RenameColumn(table: "dbo.Responds", name: "ExecutorId", newName: "Executor_Id");
        }
    }
}
