// Services/StartupService.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using HRInterview.API.Data;
using HRInterview.API.Models;

namespace HRInterview.API.Services
{
    public class StartupService
    {
        private readonly IServiceProvider _serviceProvider;

        public StartupService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task EnsureHRUsersExist()
        {
            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            
            var hrCredentials = new List<HRCredential>
            {
                new HRCredential { Name = "HR Manager", Email = "hr@company.com", Password = "hr123" },
                new HRCredential { Name = "Sarah Johnson", Email = "sarah@company.com", Password = "sarah123" },
                new HRCredential { Name = "Michael Brown", Email = "michael@company.com", Password = "mike123" }
            };

            foreach (var cred in hrCredentials)
            {
                var exists = await context.Users.AnyAsync(u => u.Email == cred.Email);
                if (!exists)
                {
                    context.Users.Add(new User
                    {
                        Name = cred.Name,
                        Email = cred.Email,
                        Password = BCrypt.Net.BCrypt.HashPassword(cred.Password),
                        Role = "HR",
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }
            
            await context.SaveChangesAsync();
            Console.WriteLine("[INFO] HR users initialized successfully");
        }
    }

    // Helper class for HR credentials
    public class HRCredential
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}