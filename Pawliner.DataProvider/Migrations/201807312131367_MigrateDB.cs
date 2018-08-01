namespace Pawliner.DataProvider.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrateDB : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Documents",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Picture = c.Binary(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Executors", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.Executors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false),
                        Patronymic = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.JuridicalExecutors",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        FullJuredicalName = c.String(),
                        ShortJuredicalName = c.String(),
                        PayerAccountNumber = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Executors", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.NaturalExecutors",
                c => new
                    {
                        Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Executors", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.Photos",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Picture = c.Binary(),
                        Executor_Id = c.Int(),
                        Order_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Executors", t => t.Executor_Id)
                .ForeignKey("dbo.Orders", t => t.Order_Id)
                .Index(t => t.Executor_Id)
                .Index(t => t.Order_Id);
            
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Header = c.String(nullable: false, maxLength: 128),
                        Description = c.String(nullable: false),
                        City = c.String(nullable: false),
                        Address = c.String(),
                        Price = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 32),
                        PhoneNumber = c.String(nullable: false),
                        CompletedOn = c.String(nullable: false),
                        CreatedAt = c.String(),
                        UpdatedAt = c.String(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Services",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Description = c.String(nullable: false),
                        Executor_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Executors", t => t.Executor_Id)
                .ForeignKey("dbo.Orders", t => t.Id)
                .Index(t => t.Id)
                .Index(t => t.Executor_Id);
            
            CreateTable(
                "dbo.ServiceClassifers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ParentId = c.Int(nullable: false),
                        Description = c.String(),
                        Service_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Services", t => t.Service_Id)
                .Index(t => t.Service_Id);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        FullName = c.String(),
                        Skype = c.String(),
                        Birthday = c.DateTime(nullable: false),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.SoleTraderExecutors",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        PayerAccountNumber = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Executors", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Documents", "Id", "dbo.Executors");
            DropForeignKey("dbo.SoleTraderExecutors", "Id", "dbo.Executors");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Orders", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Services", "Id", "dbo.Orders");
            DropForeignKey("dbo.ServiceClassifers", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.Services", "Executor_Id", "dbo.Executors");
            DropForeignKey("dbo.Photos", "Order_Id", "dbo.Orders");
            DropForeignKey("dbo.Photos", "Executor_Id", "dbo.Executors");
            DropForeignKey("dbo.NaturalExecutors", "Id", "dbo.Executors");
            DropForeignKey("dbo.JuridicalExecutors", "Id", "dbo.Executors");
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.SoleTraderExecutors", new[] { "Id" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.ServiceClassifers", new[] { "Service_Id" });
            DropIndex("dbo.Services", new[] { "Executor_Id" });
            DropIndex("dbo.Services", new[] { "Id" });
            DropIndex("dbo.Orders", new[] { "User_Id" });
            DropIndex("dbo.Photos", new[] { "Order_Id" });
            DropIndex("dbo.Photos", new[] { "Executor_Id" });
            DropIndex("dbo.NaturalExecutors", new[] { "Id" });
            DropIndex("dbo.JuridicalExecutors", new[] { "Id" });
            DropIndex("dbo.Documents", new[] { "Id" });
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.SoleTraderExecutors");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.ServiceClassifers");
            DropTable("dbo.Services");
            DropTable("dbo.Orders");
            DropTable("dbo.Photos");
            DropTable("dbo.NaturalExecutors");
            DropTable("dbo.JuridicalExecutors");
            DropTable("dbo.Executors");
            DropTable("dbo.Documents");
        }
    }
}
