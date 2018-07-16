namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        Header = c.String(),
                        Description = c.String(),
                        City = c.String(),
                        Address = c.String(),
                        CompletionDate = c.DateTime(nullable: false),
                        Price = c.Single(nullable: false),
                        Name = c.String(),
                        PhoneNumber = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Orders");
        }
    }
}
