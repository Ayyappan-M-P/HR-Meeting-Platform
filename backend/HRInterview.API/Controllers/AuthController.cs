// // // // using Microsoft.AspNetCore.Mvc;
// // // // using Microsoft.EntityFrameworkCore;
// // // // using HRInterview.API.Data;
// // // // using HRInterview.API.Services;
// // // // using BCrypt.Net;

// // // // namespace HRInterview.API.Controllers
// // // // {
// // // //     [ApiController]
// // // //     [Route("api/[controller]")]
// // // //     public class AuthController : ControllerBase
// // // //     {
// // // //         private readonly AppDbContext _context;
// // // //         private readonly IJwtService _jwtService;

// // // //         public AuthController(AppDbContext context, IJwtService jwtService)
// // // //         {
// // // //             _context = context;
// // // //             _jwtService = jwtService;
// // // //         }

// // // //         [HttpPost("login")]
// // // //         public async Task<IActionResult> Login([FromBody] LoginDto dto)
// // // //         {
// // // //             var user = await _context.Users
// // // //                 .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Role == "HR");

// // // //             if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
// // // //             {
// // // //                 return Unauthorized(new { message = "Invalid credentials" });
// // // //             }

// // // //             var token = _jwtService.GenerateToken(user.Id, user.Email, user.Role);

// // // //             return Ok(new
// // // //             {
// // // //                 token,
// // // //                 user = new
// // // //                 {
// // // //                     user.Id,
// // // //                     user.Name,
// // // //                     user.Email,
// // // //                     user.Role
// // // //                 }
// // // //             });
// // // //         }
// // // //     }

// // // //     public class LoginDto
// // // //     {
// // // //         public string Email { get; set; } = string.Empty;
// // // //         public string Password { get; set; } = string.Empty;
// // // //     }
// // // // }

// // // // Controllers/AuthController.cs
// // // using Microsoft.AspNetCore.Mvc;
// // // using Microsoft.EntityFrameworkCore;
// // // using HRInterview.API.Data;
// // // using HRInterview.API.DTOs;
// // // using HRInterview.API.Services;

// // // namespace HRInterview.API.Controllers
// // // {
// // //     [ApiController]
// // //     [Route("api/[controller]")]
// // //     public class AuthController : ControllerBase
// // //     {
// // //         private readonly AppDbContext _context;
// // //         private readonly IJwtService _jwtService;

// // //         public AuthController(AppDbContext context, IJwtService jwtService)
// // //         {
// // //             _context = context;
// // //             _jwtService = jwtService;
// // //         }

// // //         [HttpPost("login")]
// // //         public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
// // //         {
// // //             if (!ModelState.IsValid)
// // //             {
// // //                 return BadRequest(new ApiResponseDto
// // //                 {
// // //                     Success = false,
// // //                     Message = "Invalid input",
// // //                     Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList()
// // //                 });
// // //             }

// // //             var user = await _context.Users
// // //                 .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Role == "HR");

// // //             if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
// // //             {
// // //                 return Unauthorized(new ApiResponseDto
// // //                 {
// // //                     Success = false,
// // //                     Message = "Invalid email or password"
// // //                 });
// // //             }

// // //             var token = _jwtService.GenerateToken(user.Id, user.Email, user.Role);

// // //             return Ok(new AuthResponseDto
// // //             {
// // //                 Token = token,
// // //                 User = new UserDto
// // //                 {
// // //                     Id = user.Id,
// // //                     Name = user.Name,
// // //                     Email = user.Email,
// // //                     Role = user.Role
// // //                 }
// // //             });
// // //         }

// // //         [HttpPost("register-hr")]
// // //         public async Task<IActionResult> RegisterHR([FromBody] RegisterHRDto dto)
// // //         {
// // //             if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
// // //             {
// // //                 return BadRequest(new ApiResponseDto
// // //                 {
// // //                     Success = false,
// // //                     Message = "Email already exists"
// // //                 });
// // //             }

// // //             var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

// // //             var user = new Models.User
// // //             {
// // //                 Name = dto.Name,
// // //                 Email = dto.Email,
// // //                 Password = hashedPassword,
// // //                 Role = "HR"
// // //             };

// // //             _context.Users.Add(user);
// // //             await _context.SaveChangesAsync();

// // //             return Ok(new ApiResponseDto
// // //             {
// // //                 Success = true,
// // //                 Message = "HR user registered successfully"
// // //             });
// // //         }
// // //     }

// // //     public class RegisterHRDto
// // //     {
// // //         public string Name { get; set; } = string.Empty;
// // //         public string Email { get; set; } = string.Empty;
// // //         public string Password { get; set; } = string.Empty;
// // //     }
// // // }

// // // Controllers/AuthController.cs - Updated with In-Code HR Auth
// // using Microsoft.AspNetCore.Mvc;
// // using Microsoft.EntityFrameworkCore;
// // using HRInterview.API.Data;
// // using HRInterview.API.DTOs;
// // using HRInterview.API.Services;
// // using HRInterview.API.Models;

// // namespace HRInterview.API.Controllers
// // {
// //     [ApiController]
// //     [Route("api/[controller]")]
// //     public class AuthController : ControllerBase
// //     {
// //         private readonly AppDbContext _context;
// //         private readonly IJwtService _jwtService;

// //         // Default HR Credentials (Hard-coded)
// //         private readonly List<HRCredential> _hrCredentials = new()
// //         {
// //             new HRCredential { Id = 1, Name = "HR Manager", Email = "hr@company.com", Password = "hr123" },
// //             new HRCredential { Id = 2, Name = "Sarah Johnson", Email = "sarah@company.com", Password = "sarah123" },
// //             new HRCredential { Id = 3, Name = "Michael Brown", Email = "michael@company.com", Password = "mike123" }
// //         };

// //         public AuthController(AppDbContext context, IJwtService jwtService)
// //         {
// //             _context = context;
// //             _jwtService = jwtService;
// //         }

// //         // HR Login - Uses hardcoded credentials
// //         [HttpPost("hr/login")]
// //         public IActionResult HRLogin([FromBody] LoginDto dto)
// //         {
// //             if (!ModelState.IsValid)
// //             {
// //                 return BadRequest(new ApiResponseDto
// //                 {
// //                     Success = false,
// //                     Message = "Invalid input"
// //                 });
// //             }

// //             // Check against hardcoded HR credentials
// //             var hrUser = _hrCredentials.FirstOrDefault(h => 
// //                 h.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase) && 
// //                 h.Password == dto.Password);

// //             if (hrUser == null)
// //             {
// //                 return Unauthorized(new ApiResponseDto
// //                 {
// //                     Success = false,
// //                     Message = "Invalid HR credentials"
// //                 });
// //             }

// //             // Generate JWT token
// //             var token = _jwtService.GenerateToken(hrUser.Id, hrUser.Email, "HR");

// //             return Ok(new AuthResponseDto
// //             {
// //                 Token = token,
// //                 User = new UserDto
// //                 {
// //                     Id = hrUser.Id,
// //                     Name = hrUser.Name,
// //                     Email = hrUser.Email,
// //                     Role = "HR"
// //                 }
// //             });
// //         }

// //         // Candidate Login - Uses email and meeting ID
// //         [HttpPost("candidate/login")]
// //         public async Task<ActionResult<CandidateAuthResponseDto>> CandidateLogin([FromBody] CandidateLoginDto dto)
// //         {
// //             if (!ModelState.IsValid)
// //             {
// //                 return BadRequest(new ApiResponseDto
// //                 {
// //                     Success = false,
// //                     Message = "Invalid input",
// //                     Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList()
// //                 });
// //             }

// //             // Find interview by meeting ID and candidate email
// //             var interview = await _context.Interviews
// //                 .Include(i => i.HR)
// //                 .FirstOrDefaultAsync(i => 
// //                     i.MeetingLink.Contains(dto.MeetingId) && 
// //                     i.CandidateEmail.Equals(dto.Email, StringComparison.OrdinalIgnoreCase));

// //             if (interview == null)
// //             {
// //                 return Unauthorized(new ApiResponseDto
// //                 {
// //                     Success = false,
// //                     Message = "Invalid meeting ID or email. Please check your invitation."
// //                 });
// //             }

// //             // Check if interview is in the future or ongoing
// //             if (interview.Status == "Completed")
// //             {
// //                 return BadRequest(new ApiResponseDto
// //                 {
// //                     Success = false,
// //                     Message = "This interview has already been completed."
// //                 });
// //             }

// //             // Create or get candidate record
// //             var candidate = await _context.Candidates
// //                 .FirstOrDefaultAsync(c => c.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase));

// //             if (candidate == null)
// //             {
// //                 candidate = new Candidate
// //                 {
// //                     Email = dto.Email,
// //                     Name = dto.Name ?? dto.Email.Split('@')[0],
// //                     ResumeUrl = dto.ResumeUrl
// //                 };
// //                 _context.Candidates.Add(candidate);
// //                 await _context.SaveChangesAsync();
// //             }

// //             // Generate token for candidate
// //             var token = _jwtService.GenerateToken(candidate.Id, candidate.Email, "Candidate");

// //             return Ok(new CandidateAuthResponseDto
// //             {
// //                 Token = token,
// //                 Candidate = new CandidateDto
// //                 {
// //                     Id = candidate.Id,
// //                     Name = candidate.Name,
// //                     Email = candidate.Email,
// //                     Role = "Candidate"
// //                 },
// //                 Interview = new InterviewResponseDto
// //                 {
// //                     Id = interview.Id,
// //                     CandidateEmail = interview.CandidateEmail,
// //                     MeetingLink = interview.MeetingLink,
// //                     ScheduledAt = interview.ScheduledAt,
// //                     Status = interview.Status,
// //                     CreatedAt = interview.CreatedAt,
// //                     AlertCount = 0,
// //                     HasScorecard = false
// //                 },
// //                 HRName = interview.HR?.Name ?? "HR Manager"
// //             });
// //         }

// //         // Get all available HR accounts (for login page display)
// //         [HttpGet("hr/accounts")]
// //         public IActionResult GetHRAccounts()
// //         {
// //             return Ok(_hrCredentials.Select(h => new
// //             {
// //                 h.Name,
// //                 h.Email,
// //                 Message = "Use password from documentation"
// //             }));
// //         }
// //     }

// //     // Helper class for hardcoded HR credentials
// //     public class HRCredential
// //     {
// //         public int Id { get; set; }
// //         public string Name { get; set; } = string.Empty;
// //         public string Email { get; set; } = string.Empty;
// //         public string Password { get; set; } = string.Empty;
// //     }
// // }

// // Controllers/AuthController.cs - Fixed with Database Sync
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using HRInterview.API.Data;
// using HRInterview.API.DTOs;
// using HRInterview.API.Services;
// using HRInterview.API.Models;

// namespace HRInterview.API.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class AuthController : ControllerBase
//     {
//         private readonly AppDbContext _context;
//         private readonly IJwtService _jwtService;

//         // Default HR Credentials (Hard-coded)
//         private readonly List<HRCredential> _hrCredentials = new()
//         {
//             new HRCredential { Name = "HR Manager", Email = "hr@company.com", Password = "hr123" },
//             new HRCredential { Name = "Sarah Johnson", Email = "sarah@company.com", Password = "sarah123" },
//             new HRCredential { Name = "Michael Brown", Email = "michael@company.com", Password = "mike123" }
//         };

//         public AuthController(AppDbContext context, IJwtService jwtService)
//         {
//             _context = context;
//             _jwtService = jwtService;
            
//             // Ensure HR users exist in database on startup
//             _ = EnsureHRUsersExist();
//         }

//         // Ensure HR users exist in the database
//         private async Task EnsureHRUsersExist()
//         {
//             try
//             {
//                 foreach (var hrCred in _hrCredentials)
//                 {
//                     var existingUser = await _context.Users
//                         .FirstOrDefaultAsync(u => u.Email == hrCred.Email);

//                     if (existingUser == null)
//                     {
//                         var newUser = new User
//                         {
//                             Name = hrCred.Name,
//                             Email = hrCred.Email,
//                             Password = BCrypt.Net.BCrypt.HashPassword(hrCred.Password),
//                             Role = "HR",
//                             CreatedAt = DateTime.UtcNow
//                         };

//                         _context.Users.Add(newUser);
//                     }
//                 }

//                 await _context.SaveChangesAsync();
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"Error ensuring HR users exist: {ex.Message}");
//             }
//         }

//         // HR Login - Uses hardcoded credentials but returns DB user
//         [HttpPost("hr/login")]
//         public async Task<ActionResult<AuthResponseDto>> HRLogin([FromBody] LoginDto dto)
//         {
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Invalid input"
//                 });
//             }

//             // Check against hardcoded HR credentials
//             var hrCred = _hrCredentials.FirstOrDefault(h => 
//                 h.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase) && 
//                 h.Password == dto.Password);

//             if (hrCred == null)
//             {
//                 return Unauthorized(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Invalid HR credentials"
//                 });
//             }

//             // Get the actual user from database
//             var hrUser = await _context.Users
//                 .FirstOrDefaultAsync(u => u.Email == hrCred.Email && u.Role == "HR");

//             if (hrUser == null)
//             {
//                 // Create user if doesn't exist
//                 hrUser = new User
//                 {
//                     Name = hrCred.Name,
//                     Email = hrCred.Email,
//                     Password = BCrypt.Net.BCrypt.HashPassword(hrCred.Password),
//                     Role = "HR",
//                     CreatedAt = DateTime.UtcNow
//                 };

//                 _context.Users.Add(hrUser);
//                 await _context.SaveChangesAsync();
//             }

//             // Generate JWT token with REAL database ID
//             var token = _jwtService.GenerateToken(hrUser.Id, hrUser.Email, "HR");

//             return Ok(new AuthResponseDto
//             {
//                 Token = token,
//                 User = new UserDto
//                 {
//                     Id = hrUser.Id,
//                     Name = hrUser.Name,
//                     Email = hrUser.Email,
//                     Role = "HR"
//                 }
//             });
//         }

//         // Candidate Login - Uses email and meeting ID
//         [HttpPost("candidate/login")]
//         public async Task<ActionResult<CandidateAuthResponseDto>> CandidateLogin([FromBody] CandidateLoginDto dto)
//         {
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Invalid input",
//                     Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList()
//                 });
//             }

//             // Find interview by meeting ID and candidate email
//             var interview = await _context.Interviews
//                 .Include(i => i.HR)
//                 .FirstOrDefaultAsync(i => 
//                     i.MeetingLink.Contains(dto.MeetingId) && 
//                     i.CandidateEmail.Equals(dto.Email, StringComparison.OrdinalIgnoreCase));

//             if (interview == null)
//             {
//                 return Unauthorized(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Invalid meeting ID or email. Please check your invitation."
//                 });
//             }

//             // Check if interview is in the future or ongoing
//             if (interview.Status == "Completed")
//             {
//                 return BadRequest(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "This interview has already been completed."
//                 });
//             }

//             // Create or get candidate record
//             var candidate = await _context.Candidates
//                 .FirstOrDefaultAsync(c => c.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase));

//             if (candidate == null)
//             {
//                 candidate = new Candidate
//                 {
//                     Email = dto.Email,
//                     Name = dto.Name ?? dto.Email.Split('@')[0],
//                     ResumeUrl = dto.ResumeUrl
//                 };
//                 _context.Candidates.Add(candidate);
//                 await _context.SaveChangesAsync();
//             }

//             // Generate token for candidate
//             var token = _jwtService.GenerateToken(candidate.Id, candidate.Email, "Candidate");

//             return Ok(new CandidateAuthResponseDto
//             {
//                 Token = token,
//                 Candidate = new CandidateDto
//                 {
//                     Id = candidate.Id,
//                     Name = candidate.Name,
//                     Email = candidate.Email,
//                     Role = "Candidate"
//                 },
//                 Interview = new InterviewResponseDto
//                 {
//                     Id = interview.Id,
//                     CandidateEmail = interview.CandidateEmail,
//                     MeetingLink = interview.MeetingLink,
//                     ScheduledAt = interview.ScheduledAt,
//                     Status = interview.Status,
//                     CreatedAt = interview.CreatedAt,
//                     AlertCount = 0,
//                     HasScorecard = false
//                 },
//                 HRName = interview.HR?.Name ?? "HR Manager"
//             });
//         }

//         // Get all available HR accounts (for login page display)
//         [HttpGet("hr/accounts")]
//         public IActionResult GetHRAccounts()
//         {
//             return Ok(_hrCredentials.Select(h => new
//             {
//                 h.Name,
//                 h.Email,
//                 Password = h.Password, // Show password for demo purposes
//                 Message = "Use these credentials to login"
//             }));
//         }
//     }

//     // Helper class for hardcoded HR credentials
//     public class HRCredential
//     {
//         public string Name { get; set; } = string.Empty;
//         public string Email { get; set; } = string.Empty;
//         public string Password { get; set; } = string.Empty;
//     }
// }

// // Controllers/AuthController.cs - Fixed with Database Sync
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using HRInterview.API.Data;
// using HRInterview.API.DTOs;
// using HRInterview.API.Services;
// using HRInterview.API.Models;

// namespace HRInterview.API.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class AuthController : ControllerBase
//     {
//         private readonly AppDbContext _context;
//         private readonly IJwtService _jwtService;

//         // Default HR Credentials (Hard-coded)
//         private readonly List<HRCredential> _hrCredentials = new()
//         {
//             new HRCredential { Name = "HR Manager", Email = "hr@company.com", Password = "hr123" },
//             new HRCredential { Name = "Sarah Johnson", Email = "sarah@company.com", Password = "sarah123" },
//             new HRCredential { Name = "Michael Brown", Email = "michael@company.com", Password = "mike123" }
//         };

//         public AuthController(AppDbContext context, IJwtService jwtService)
//         {
//             _context = context;
//             _jwtService = jwtService;
            
//             // Ensure HR users exist in database on startup
//             _ = EnsureHRUsersExist();
//         }

//         // Ensure HR users exist in the database
//         private async Task EnsureHRUsersExist()
//         {
//             try
//             {
//                 foreach (var hrCred in _hrCredentials)
//                 {
//                     var existingUser = await _context.Users
//                         .FirstOrDefaultAsync(u => u.Email == hrCred.Email);

//                     if (existingUser == null)
//                     {
//                         var newUser = new User
//                         {
//                             Name = hrCred.Name,
//                             Email = hrCred.Email,
//                             Password = BCrypt.Net.BCrypt.HashPassword(hrCred.Password),
//                             Role = "HR",
//                             CreatedAt = DateTime.UtcNow
//                         };

//                         _context.Users.Add(newUser);
//                     }
//                 }

//                 await _context.SaveChangesAsync();
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"Error ensuring HR users exist: {ex.Message}");
//             }
//         }

//         // HR Login - Uses hardcoded credentials but returns DB user
//         [HttpPost("hr/login")]
//         public async Task<ActionResult<AuthResponseDto>> HRLogin([FromBody] LoginDto dto)
//         {
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Invalid input"
//                 });
//             }

//             // Check against hardcoded HR credentials
//             var hrCred = _hrCredentials.FirstOrDefault(h => 
//                 h.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase) && 
//                 h.Password == dto.Password);

//             if (hrCred == null)
//             {
//                 return Unauthorized(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Invalid HR credentials"
//                 });
//             }

//             // Get the actual user from database
//             var hrUser = await _context.Users
//                 .FirstOrDefaultAsync(u => u.Email == hrCred.Email && u.Role == "HR");

//             if (hrUser == null)
//             {
//                 // Create user if doesn't exist
//                 hrUser = new User
//                 {
//                     Name = hrCred.Name,
//                     Email = hrCred.Email,
//                     Password = BCrypt.Net.BCrypt.HashPassword(hrCred.Password),
//                     Role = "HR",
//                     CreatedAt = DateTime.UtcNow
//                 };

//                 _context.Users.Add(hrUser);
//                 await _context.SaveChangesAsync();
//             }

//             // Generate JWT token with REAL database ID
//             var token = _jwtService.GenerateToken(hrUser.Id, hrUser.Email, "HR");

//             return Ok(new AuthResponseDto
//             {
//                 Token = token,
//                 User = new UserDto
//                 {
//                     Id = hrUser.Id,
//                     Name = hrUser.Name,
//                     Email = hrUser.Email,
//                     Role = "HR"
//                 }
//             });
//         }

//         // Candidate Login - Uses email and meeting ID
//         [HttpPost("candidate/login")]
//         public async Task<ActionResult<CandidateAuthResponseDto>> CandidateLogin([FromBody] CandidateLoginDto dto)
//         {
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Invalid input",
//                     Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList()
//                 });
//             }

//             Console.WriteLine($"[DEBUG] Candidate login attempt - Email: {dto.Email}, MeetingId: {dto.MeetingId}");

//             // Find interview by meeting ID (extract from meeting link) and candidate email
//             // MeetingLink format: http://localhost:5173/join/GMJ-HSX-GPD
//             // MeetingId format: GMJ-HSX-GPD
//             var interview = await _context.Interviews
//                 .Include(i => i.HR)
//                 .FirstOrDefaultAsync(i => 
//                     i.MeetingLink.EndsWith(dto.MeetingId) && 
//                     i.CandidateEmail.Equals(dto.Email, StringComparison.OrdinalIgnoreCase));

//             if (interview == null)
//             {
//                 Console.WriteLine($"[ERROR] Interview not found for MeetingId: {dto.MeetingId}, Email: {dto.Email}");
                
//                 // Log all interviews for debugging
//                 var allInterviews = await _context.Interviews
//                     .Select(i => new { i.MeetingLink, i.CandidateEmail })
//                     .ToListAsync();
//                 Console.WriteLine($"[DEBUG] Total interviews in DB: {allInterviews.Count}");
//                 foreach (var inv in allInterviews)
//                 {
//                     Console.WriteLine($"[DEBUG] Interview - Link: {inv.MeetingLink}, Email: {inv.CandidateEmail}");
//                 }

//                 return Unauthorized(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Invalid meeting ID or email. Please check your invitation and ensure both match exactly."
//                 });
//             }

//             Console.WriteLine($"[DEBUG] Interview found - ID: {interview.Id}, Status: {interview.Status}");

//             // Check if interview is completed
//             if (interview.Status == "Completed")
//             {
//                 return BadRequest(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "This interview has already been completed."
//                 });
//             }

//             // Create or get candidate record
//             var candidate = await _context.Candidates
//                 .FirstOrDefaultAsync(c => c.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase));

//             if (candidate == null)
//             {
//                 Console.WriteLine($"[DEBUG] Creating new candidate: {dto.Email}");
//                 candidate = new Candidate
//                 {
//                     Email = dto.Email,
//                     Name = dto.Name ?? dto.Email.Split('@')[0],
//                     ResumeUrl = dto.ResumeUrl,
//                     CreatedAt = DateTime.UtcNow
//                 };
//                 _context.Candidates.Add(candidate);
//                 await _context.SaveChangesAsync();
//                 Console.WriteLine($"[DEBUG] Candidate created with ID: {candidate.Id}");
//             }
//             else
//             {
//                 Console.WriteLine($"[DEBUG] Existing candidate found: {candidate.Id}");
//             }

//             // Generate token for candidate
//             var token = _jwtService.GenerateToken(candidate.Id, candidate.Email, "Candidate");

//             Console.WriteLine($"[DEBUG] Token generated successfully for candidate: {candidate.Email}");

//             return Ok(new CandidateAuthResponseDto
//             {
//                 Token = token,
//                 Candidate = new CandidateDto
//                 {
//                     Id = candidate.Id,
//                     Name = candidate.Name,
//                     Email = candidate.Email,
//                     Role = "Candidate"
//                 },
//                 Interview = new InterviewResponseDto
//                 {
//                     Id = interview.Id,
//                     CandidateEmail = interview.CandidateEmail,
//                     MeetingLink = interview.MeetingLink,
//                     ScheduledAt = interview.ScheduledAt,
//                     Status = interview.Status,
//                     CreatedAt = interview.CreatedAt,
//                     AlertCount = 0,
//                     HasScorecard = false
//                 },
//                 HRName = interview.HR?.Name ?? "HR Manager"
//             });
//         }

//         // Get all available HR accounts (for login page display)
//         [HttpGet("hr/accounts")]
//         public IActionResult GetHRAccounts()
//         {
//             return Ok(_hrCredentials.Select(h => new
//             {
//                 h.Name,
//                 h.Email,
//                 Password = h.Password, // Show password for demo purposes
//                 Message = "Use these credentials to login"
//             }));
//         }
//     }

//     // Helper class for hardcoded HR credentials
//     public class HRCredential
//     {
//         public string Name { get; set; } = string.Empty;
//         public string Email { get; set; } = string.Empty;
//         public string Password { get; set; } = string.Empty;
//     }
// }

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRInterview.API.Data;
using HRInterview.API.DTOs;
using HRInterview.API.Services;
using HRInterview.API.Models;

namespace HRInterview.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;

        // Default HR Credentials (Hard-coded)
        private readonly List<HRCredential> _hrCredentials = new()
        {
            new HRCredential { Name = "HR Manager", Email = "hr@company.com", Password = "hr123" },
            new HRCredential { Name = "Sarah Johnson", Email = "sarah@company.com", Password = "sarah123" },
            new HRCredential { Name = "Michael Brown", Email = "michael@company.com", Password = "mike123" }
        };

        public AuthController(AppDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // HR Login - Uses hardcoded credentials but returns DB user
        [HttpPost("hr/login")]
        public async Task<ActionResult<AuthResponseDto>> HRLogin([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponseDto
                {
                    Success = false,
                    Message = "Invalid input"
                });
            }

            try
            {
                // Check against hardcoded HR credentials
                var hrCred = _hrCredentials.FirstOrDefault(h => 
                    h.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase) && 
                    h.Password == dto.Password);

                if (hrCred == null)
                {
                    return Unauthorized(new ApiResponseDto
                    {
                        Success = false,
                        Message = "Invalid HR credentials"
                    });
                }

                // Get the actual user from database
                var hrUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == hrCred.Email && u.Role == "HR");

                if (hrUser == null)
                {
                    // Create user if doesn't exist
                    hrUser = new User
                    {
                        Name = hrCred.Name,
                        Email = hrCred.Email,
                        Password = BCrypt.Net.BCrypt.HashPassword(hrCred.Password),
                        Role = "HR",
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.Users.Add(hrUser);
                    await _context.SaveChangesAsync();
                }

                // Generate JWT token with REAL database ID
                var token = _jwtService.GenerateToken(hrUser.Id, hrUser.Email, "HR");

                return Ok(new AuthResponseDto
                {
                    Token = token,
                    User = new UserDto
                    {
                        Id = hrUser.Id,
                        Name = hrUser.Name,
                        Email = hrUser.Email,
                        Role = "HR"
                    }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] HR Login failed: {ex.Message}");
                Console.WriteLine($"[ERROR] Stack trace: {ex.StackTrace}");
                
                return StatusCode(500, new ApiResponseDto
                {
                    Success = false,
                    Message = "An error occurred during login. Please try again."
                });
            }
        }

        // Candidate Login - Uses email and meeting ID
        [HttpPost("candidate/login")]
        public async Task<ActionResult<CandidateAuthResponseDto>> CandidateLogin([FromBody] CandidateLoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponseDto
                {
                    Success = false,
                    Message = "Invalid input",
                    Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList()
                });
            }

            try
            {
                Console.WriteLine($"[DEBUG] Candidate login attempt - Email: {dto.Email}, MeetingId: {dto.MeetingId}");

                // Find interview by meeting ID and candidate email
                var interview = await _context.Interviews
                    .Include(i => i.HR)
                    .FirstOrDefaultAsync(i => 
                        i.MeetingLink.EndsWith(dto.MeetingId) && 
                        i.CandidateEmail.Equals(dto.Email, StringComparison.OrdinalIgnoreCase));

                if (interview == null)
                {
                    Console.WriteLine($"[ERROR] Interview not found for MeetingId: {dto.MeetingId}, Email: {dto.Email}");

                    return Unauthorized(new ApiResponseDto
                    {
                        Success = false,
                        Message = "Invalid meeting ID or email. Please check your invitation and ensure both match exactly."
                    });
                }

                Console.WriteLine($"[DEBUG] Interview found - ID: {interview.Id}, Status: {interview.Status}");

                // Check if interview is completed
                if (interview.Status == "Completed")
                {
                    return BadRequest(new ApiResponseDto
                    {
                        Success = false,
                        Message = "This interview has already been completed."
                    });
                }

                // Create or get candidate record
                var candidate = await _context.Candidates
                    .FirstOrDefaultAsync(c => c.Email.Equals(dto.Email, StringComparison.OrdinalIgnoreCase));

                if (candidate == null)
                {
                    Console.WriteLine($"[DEBUG] Creating new candidate: {dto.Email}");
                    candidate = new Candidate
                    {
                        Email = dto.Email,
                        Name = dto.Name ?? dto.Email.Split('@')[0],
                        ResumeUrl = dto.ResumeUrl,
                        CreatedAt = DateTime.UtcNow
                    };
                    _context.Candidates.Add(candidate);
                    await _context.SaveChangesAsync();
                    Console.WriteLine($"[DEBUG] Candidate created with ID: {candidate.Id}");
                }
                else
                {
                    Console.WriteLine($"[DEBUG] Existing candidate found: {candidate.Id}");
                }

                // Generate token for candidate
                var token = _jwtService.GenerateToken(candidate.Id, candidate.Email, "Candidate");

                Console.WriteLine($"[DEBUG] Token generated successfully for candidate: {candidate.Email}");

                return Ok(new CandidateAuthResponseDto
                {
                    Token = token,
                    Candidate = new CandidateDto
                    {
                        Id = candidate.Id,
                        Name = candidate.Name,
                        Email = candidate.Email,
                        Role = "Candidate"
                    },
                    Interview = new InterviewResponseDto
                    {
                        Id = interview.Id,
                        CandidateEmail = interview.CandidateEmail,
                        MeetingLink = interview.MeetingLink,
                        ScheduledAt = interview.ScheduledAt,
                        Status = interview.Status,
                        CreatedAt = interview.CreatedAt,
                        AlertCount = 0,
                        HasScorecard = false
                    },
                    HRName = interview.HR?.Name ?? "HR Manager"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Candidate Login failed: {ex.Message}");
                Console.WriteLine($"[ERROR] Stack trace: {ex.StackTrace}");
                
                return StatusCode(500, new ApiResponseDto
                {
                    Success = false,
                    Message = "An error occurred during login. Please try again."
                });
            }
        }

        // Get all available HR accounts (for login page display)
        [HttpGet("hr/accounts")]
        public IActionResult GetHRAccounts()
        {
            return Ok(_hrCredentials.Select(h => new
            {
                h.Name,
                h.Email,
                Password = h.Password,
                Message = "Use these credentials to login"
            }));
        }
    }

    // Helper class for hardcoded HR credentials
    public class HRCredential
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}