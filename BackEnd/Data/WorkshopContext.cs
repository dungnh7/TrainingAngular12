using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using sd2376_workshop_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task = sd2376_workshop_backend.Models.Task;

namespace sd2376_workshop_backend.Data
{
    public class WorkshopContext: IdentityDbContext<Member, Role, int, IdentityUserClaim<int>, MemberRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public WorkshopContext(DbContextOptions<WorkshopContext> options) : base(options)
        {
        }
        public DbSet<Status> Status { get; set; }
        public DbSet<Schedule> Schedule { get; set; }
        public DbSet<Models.Task> Task { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Member> Member { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Status>().ToTable("Status");
            builder.Entity<Schedule>().ToTable("Schedule");
            builder.Entity<Task>().ToTable("Task");
            builder.Entity<User>().ToTable("User");

            base.OnModelCreating(builder);

            builder.Entity<MemberRole>(b =>
            {
                b.HasKey(ur => new { ur.UserId, ur.RoleId });
                b.HasOne(ur => ur.Role).WithMany(x => x.Users).HasForeignKey(r => r.RoleId);
                b.HasOne(ur => ur.Member).WithMany(x => x.Roles).HasForeignKey(u => u.UserId);
                b.ToTable("Member_Role");
            });


            builder.Entity<Role>()
                .ToTable("Roles");

            builder.Entity<IdentityUserClaim<int>>(b =>
            {
                b.ToTable("Member_Claim");
            });

            builder.Entity<IdentityRoleClaim<int>>(b =>
            {
                b.ToTable("Role_Claim");
            });

            builder.Entity<IdentityUserLogin<int>>(b =>
            {
                b.ToTable("Member_Login");
            });

            builder.Entity<IdentityUserToken<int>>(b =>
            {
                b.ToTable("Member_Token");
            });
        }
    }
}
