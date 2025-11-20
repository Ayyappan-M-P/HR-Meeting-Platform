// // Controllers/DebugController.cs - Temporary Debug Helper
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using HRInterview.API.Data;
// using HRInterview.API.Models;

// namespace HRInterview.API.Controllers
// {
//     [ApiController]
//     [Route("api/debug")]
//     public class DebugController : ControllerBase
//     {
//         private readonly AppDbContext _context;

//         public DebugController(AppDbContext context)
//         {
//             _context = context;
//         }

//         // GET: api/debug/users - Check all users
//         [HttpGet("users")]
//         public async Task<ActionResult> GetAllUsers()
//         {
//             var users = await _context.Users
//                 .Select(u => new
//                 {
//                     u.Id,
//                     u.Name,
//                     u.Email,
//                     u.Role,
//                     u.CreatedAt
//                 })
//                 .ToListAsync();

//             return Ok(new
//             {
//                 count = users.Count,
//                 users = users
//             });
//         }

//         // GET: api/debug/check-token - Check current token info
//         [HttpGet("check-token")]
//         public ActionResult CheckToken()
//         {
//             if (!User.Identity?.IsAuthenticated ?? true)
//             {
//                 return Ok(new
//                 {
//                     authenticated = false,
//                     message = "No token or invalid token"
//                 });
//             }

//             var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
//             var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
//             var role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
//             var name = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;

//             return Ok(new
//             {
//                 authenticated = true,
//                 userId = userId,
//                 email = email,
//                 role = role,
//                 name = name
//             });
//         }

//         // POST: api/debug/sync-hr-users - Sync hardcoded HR users to database
//         [HttpPost("sync-hr-users")]
//         public async Task<ActionResult> SyncHRUsers()
//         {
//             var hrCredentials = new List<HRCredentialDto>
//             {
//                 new HRCredentialDto { Name = "HR Manager", Email = "hr@company.com", Password = "hr123" },
//                 new HRCredentialDto { Name = "Sarah Johnson", Email = "sarah@company.com", Password = "sarah123" },
//                 new HRCredentialDto { Name = "Michael Brown", Email = "michael@company.com", Password = "mike123" }
//             };

//             var syncedUsers = new List<object>();

//             foreach (var cred in hrCredentials)
//             {
//                 var existingUser = await _context.Users
//                     .FirstOrDefaultAsync(u => u.Email == cred.Email);

//                 if (existingUser == null)
//                 {
//                     var newUser = new User
//                     {
//                         Name = cred.Name,
//                         Email = cred.Email,
//                         Password = BCrypt.Net.BCrypt.HashPassword(cred.Password),
//                         Role = "HR",
//                         CreatedAt = DateTime.UtcNow
//                     };

//                     _context.Users.Add(newUser);
//                     await _context.SaveChangesAsync();

//                     syncedUsers.Add(new
//                     {
//                         status = "created",
//                         id = newUser.Id,
//                         name = newUser.Name,
//                         email = newUser.Email,
//                         password = cred.Password
//                     });
//                 }
//                 else
//                 {
//                     syncedUsers.Add(new
//                     {
//                         status = "exists",
//                         id = existingUser.Id,
//                         name = existingUser.Name,
//                         email = existingUser.Email,
//                         password = cred.Password
//                     });
//                 }
//             }

//             return Ok(new
//             {
//                 message = "HR users synced successfully",
//                 users = syncedUsers
//             });
//         }
//     }

//     // Helper DTO for HR credentials
//     public class HRCredentialDto
//     {
//         public string Name { get; set; } = string.Empty;
//         public string Email { get; set; } = string.Empty;
//         public string Password { get; set; } = string.Empty;
//     }
// }

// Controllers/DebugController.cs - Temporary Debug Helper
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRInterview.API.Data;
using HRInterview.API.Models;

namespace HRInterview.API.Controllers
{
    [ApiController]
    [Route("api/debug")]
    public class DebugController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DebugController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/debug/users - Check all users
        [HttpGet("users")]
        public async Task<ActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.Role,
                    u.CreatedAt
                })
                .ToListAsync();

            return Ok(new
            {
                count = users.Count,
                users = users
            });
        }

        // GET: api/debug/check-token - Check current token info
        [HttpGet("check-token")]
        public ActionResult CheckToken()
        {
            if (!User.Identity?.IsAuthenticated ?? true)
            {
                return Ok(new
                {
                    authenticated = false,
                    message = "No token or invalid token"
                });
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
            var role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
            var name = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;

            return Ok(new
            {
                authenticated = true,
                userId = userId,
                email = email,
                role = role,
                name = name
            });
        }

        // GET: api/debug/interviews - Check all interviews
        [HttpGet("interviews")]
        public async Task<ActionResult> GetAllInterviews()
        {
            var interviews = await _context.Interviews
                .Include(i => i.HR)
                .Select(i => new
                {
                    i.Id,
                    i.CandidateEmail,
                    i.MeetingLink,
                    MeetingId = i.MeetingLink.Substring(i.MeetingLink.LastIndexOf('/') + 1),
                    i.ScheduledAt,
                    i.Status,
                    HRName = i.HR != null ? i.HR.Name : "Unknown",
                    i.CreatedAt
                })
                .ToListAsync();

            return Ok(new
            {
                count = interviews.Count,
                interviews = interviews
            });
        }

        // POST: api/debug/sync-hr-users - Sync hardcoded HR users to database
        [HttpPost("sync-hr-users")]
        public async Task<ActionResult> SyncHRUsers()
        {
            var hrCredentials = new List<HRCredentialDto>
            {
                new HRCredentialDto { Name = "HR Manager", Email = "hr@company.com", Password = "hr123" },
                new HRCredentialDto { Name = "Sarah Johnson", Email = "sarah@company.com", Password = "sarah123" },
                new HRCredentialDto { Name = "Michael Brown", Email = "michael@company.com", Password = "mike123" }
            };

            var syncedUsers = new List<object>();

            foreach (var cred in hrCredentials)
            {
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == cred.Email);

                if (existingUser == null)
                {
                    var newUser = new User
                    {
                        Name = cred.Name,
                        Email = cred.Email,
                        Password = BCrypt.Net.BCrypt.HashPassword(cred.Password),
                        Role = "HR",
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.Users.Add(newUser);
                    await _context.SaveChangesAsync();

                    syncedUsers.Add(new
                    {
                        status = "created",
                        id = newUser.Id,
                        name = newUser.Name,
                        email = newUser.Email,
                        password = cred.Password
                    });
                }
                else
                {
                    syncedUsers.Add(new
                    {
                        status = "exists",
                        id = existingUser.Id,
                        name = existingUser.Name,
                        email = existingUser.Email,
                        password = cred.Password
                    });
                }
            }

            return Ok(new
            {
                message = "HR users synced successfully",
                users = syncedUsers
            });
        }
    }

    // Helper DTO for HR credentials
    public class HRCredentialDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}