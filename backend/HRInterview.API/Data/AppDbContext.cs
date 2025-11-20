// using Microsoft.EntityFrameworkCore;
// using HRInterview.API.Models;

// namespace HRInterview.API.Data
// {
//     public class AppDbContext : DbContext
//     {
//         public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

//         public DbSet<User> Users { get; set; }
//         public DbSet<Candidate> Candidates { get; set; }
//         public DbSet<Interview> Interviews { get; set; }
//         public DbSet<InterviewLog> InterviewLogs { get; set; }
//         public DbSet<Scorecard> Scorecards { get; set; }
//         public DbSet<Whiteboard> Whiteboards { get; set; }

//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             modelBuilder.Entity<User>()
//                 .HasIndex(u => u.Email)
//                 .IsUnique();

//             modelBuilder.Entity<Interview>()
//                 .HasIndex(i => i.MeetingLink)
//                 .IsUnique();

//             modelBuilder.Entity<Scorecard>()
//                 .HasIndex(s => s.InterviewId)
//                 .IsUnique();
//         }
//     }
// }

// // Data/AppDbContext.cs - Updated (No Users Table)
// using Microsoft.EntityFrameworkCore;
// using HRInterview.API.Models;

// namespace HRInterview.API.Data
// {
//     public class AppDbContext : DbContext
//     {
//         public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

//         // Tables
//         public DbSet<Candidate> Candidates { get; set; }
//         public DbSet<Interview> Interviews { get; set; }
//         public DbSet<InterviewLog> InterviewLogs { get; set; }
//         public DbSet<Scorecard> Scorecards { get; set; }
//         public DbSet<Whiteboard> Whiteboards { get; set; }

//         public DbSet<User> Users { get; set; }

//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             // Candidate - Unique email
//             modelBuilder.Entity<Candidate>()
//                 .HasIndex(c => c.Email)
//                 .IsUnique();

//             // Interview - Unique meeting link
//             modelBuilder.Entity<Interview>()
//                 .HasIndex(i => i.MeetingLink)
//                 .IsUnique();

//             // Interview - Index on candidate email
//             modelBuilder.Entity<Interview>()
//                 .HasIndex(i => i.CandidateEmail);

//             // Interview - Index on HR ID
//             modelBuilder.Entity<Interview>()
//                 .HasIndex(i => i.HRId);

//             // Scorecard - One per interview
//             modelBuilder.Entity<Scorecard>()
//                 .HasIndex(s => s.InterviewId)
//                 .IsUnique();

//             // InterviewLog - Index for queries
//             modelBuilder.Entity<InterviewLog>()
//                 .HasIndex(l => l.InterviewId);

//             modelBuilder.Entity<InterviewLog>()
//                 .HasIndex(l => l.Timestamp);

//             // Configure cascade delete
//             modelBuilder.Entity<Interview>()
//                 .HasMany<InterviewLog>()
//                 .WithOne()
//                 .HasForeignKey(l => l.InterviewId)
//                 .OnDelete(DeleteBehavior.Cascade);

//             modelBuilder.Entity<Interview>()
//                 .HasMany<Scorecard>()
//                 .WithOne()
//                 .HasForeignKey(s => s.InterviewId)
//                 .OnDelete(DeleteBehavior.Cascade);

//             modelBuilder.Entity<Interview>()
//                 .HasMany<Whiteboard>()
//                 .WithOne()
//                 .HasForeignKey(w => w.InterviewId)
//                 .OnDelete(DeleteBehavior.Cascade);
//         }
//     }
// }

// Data/AppDbContext.cs - Fixed Foreign Key Configuration
using Microsoft.EntityFrameworkCore;
using HRInterview.API.Models;

namespace HRInterview.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Tables
        public DbSet<User> Users { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<InterviewLog> InterviewLogs { get; set; }
        public DbSet<Scorecard> Scorecards { get; set; }
        public DbSet<Whiteboard> Whiteboards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User Configuration
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Candidate - Unique email
            modelBuilder.Entity<Candidate>()
                .HasIndex(c => c.Email)
                .IsUnique();

            // Interview - Unique meeting link
            modelBuilder.Entity<Interview>()
                .HasIndex(i => i.MeetingLink)
                .IsUnique();

            // Interview - Index on candidate email
            modelBuilder.Entity<Interview>()
                .HasIndex(i => i.CandidateEmail);

            // Interview - Index on HR ID
            modelBuilder.Entity<Interview>()
                .HasIndex(i => i.HRId);

            // Configure Interview -> User relationship
            modelBuilder.Entity<Interview>()
                .HasOne(i => i.HR)
                .WithMany()
                .HasForeignKey(i => i.HRId)
                .OnDelete(DeleteBehavior.Restrict);

            // Scorecard - One per interview
            modelBuilder.Entity<Scorecard>()
                .HasIndex(s => s.InterviewId)
                .IsUnique();

            // InterviewLog - Index for queries
            modelBuilder.Entity<InterviewLog>()
                .HasIndex(l => l.InterviewId);

            modelBuilder.Entity<InterviewLog>()
                .HasIndex(l => l.Timestamp);

            // Configure cascade delete for interview-related entities
            modelBuilder.Entity<Interview>()
                .HasMany<InterviewLog>()
                .WithOne()
                .HasForeignKey(l => l.InterviewId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Interview>()
                .HasMany<Scorecard>()
                .WithOne()
                .HasForeignKey(s => s.InterviewId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Interview>()
                .HasMany<Whiteboard>()
                .WithOne()
                .HasForeignKey(w => w.InterviewId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}