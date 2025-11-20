// // using Microsoft.AspNetCore.Authorization;
// // using Microsoft.AspNetCore.Mvc;
// // using Microsoft.EntityFrameworkCore;
// // using HRInterview.API.Data;
// // using HRInterview.API.Models;
// // using HRInterview.API.Services;

// // namespace HRInterview.API.Controllers
// // {
// //     [Authorize(Roles = "HR")]
// //     [ApiController]
// //     [Route("api/hr")]
// //     public class HRController : ControllerBase
// //     {
// //         private readonly AppDbContext _context;
// //         private readonly IEmailService _emailService;

// //         public HRController(AppDbContext context, IEmailService emailService)
// //         {
// //             _context = context;
// //             _emailService = emailService;
// //         }

// //         [HttpPost("interviews/create")]
// //         public async Task<IActionResult> CreateInterview([FromBody] CreateInterviewDto dto)
// //         {
// //             var hrId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
            
// //             var meetingLink = $"https://yourapp.com/join/{Guid.NewGuid():N}";
            
// //             var interview = new Interview
// //             {
// //                 HRId = hrId,
// //                 CandidateEmail = dto.CandidateEmail,
// //                 MeetingLink = meetingLink,
// //                 ScheduledAt = dto.ScheduledAt
// //             };

// //             _context.Interviews.Add(interview);
// //             await _context.SaveChangesAsync();

// //             // Send email
// //             await _emailService.SendInterviewLinkAsync(
// //                 dto.CandidateEmail,
// //                 dto.CandidateName,
// //                 meetingLink,
// //                 dto.ScheduledAt
// //             );

// //             return Ok(new { interviewId = interview.Id, meetingLink });
// //         }

// //         [HttpGet("interviews")]
// //         public async Task<IActionResult> GetInterviews()
// //         {
// //             var hrId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
            
// //             var interviews = await _context.Interviews
// //                 .Where(i => i.HRId == hrId)
// //                 .OrderByDescending(i => i.ScheduledAt)
// //                 .Select(i => new
// //                 {
// //                     i.Id,
// //                     i.CandidateEmail,
// //                     i.MeetingLink,
// //                     i.ScheduledAt,
// //                     i.Status
// //                 })
// //                 .ToListAsync();

// //             return Ok(interviews);
// //         }

// //         [HttpGet("interviews/{id}")]
// //         public async Task<IActionResult> GetInterview(int id)
// //         {
// //             var interview = await _context.Interviews
// //                 .Include(i => i.HR)
// //                 .FirstOrDefaultAsync(i => i.Id == id);

// //             if (interview == null)
// //                 return NotFound();

// //             var logs = await _context.InterviewLogs
// //                 .Where(l => l.InterviewId == id)
// //                 .OrderByDescending(l => l.Timestamp)
// //                 .ToListAsync();

// //             return Ok(new { interview, logs });
// //         }

// //         [HttpPost("scorecard/save")]
// //         public async Task<IActionResult> SaveScorecard([FromBody] ScorecardDto dto)
// //         {
// //             var existing = await _context.Scorecards
// //                 .FirstOrDefaultAsync(s => s.InterviewId == dto.InterviewId);

// //             if (existing != null)
// //             {
// //                 existing.Communication = dto.Communication;
// //                 existing.Technical = dto.Technical;
// //                 existing.Coding = dto.Coding;
// //                 existing.Attitude = dto.Attitude;
// //                 existing.FinalDecision = dto.FinalDecision;
// //                 existing.Comments = dto.Comments;
// //             }
// //             else
// //             {
// //                 var scorecard = new Scorecard
// //                 {
// //                     InterviewId = dto.InterviewId,
// //                     Communication = dto.Communication,
// //                     Technical = dto.Technical,
// //                     Coding = dto.Coding,
// //                     Attitude = dto.Attitude,
// //                     FinalDecision = dto.FinalDecision,
// //                     Comments = dto.Comments
// //                 };
// //                 _context.Scorecards.Add(scorecard);
// //             }

// //             await _context.SaveChangesAsync();
// //             return Ok(new { message = "Scorecard saved successfully" });
// //         }

// //         [HttpGet("scorecard/{interviewId}")]
// //         public async Task<IActionResult> GetScorecard(int interviewId)
// //         {
// //             var scorecard = await _context.Scorecards
// //                 .FirstOrDefaultAsync(s => s.InterviewId == interviewId);

// //             if (scorecard == null)
// //                 return NotFound();

// //             return Ok(scorecard);
// //         }
// //     }

// //     public class CreateInterviewDto
// //     {
// //         public string CandidateEmail { get; set; } = string.Empty;
// //         public string CandidateName { get; set; } = string.Empty;
// //         public DateTime ScheduledAt { get; set; }
// //     }

// //     public class ScorecardDto
// //     {
// //         public int InterviewId { get; set; }
// //         public int Communication { get; set; }
// //         public int Technical { get; set; }
// //         public int Coding { get; set; }
// //         public int Attitude { get; set; }
// //         public string FinalDecision { get; set; } = string.Empty;
// //         public string? Comments { get; set; }
// //     }
// // }

// // Controllers/HRController.cs - Updated
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using HRInterview.API.Data;
// using HRInterview.API.Models;
// using HRInterview.API.DTOs;
// using HRInterview.API.Services;
// using System.Security.Claims;

// namespace HRInterview.API.Controllers
// {
//     [Authorize(Roles = "HR")]
//     [ApiController]
//     [Route("api/hr")]
//     public class HRController : ControllerBase
//     {
//         private readonly AppDbContext _context;
//         private readonly IEmailService _emailService;
//         private readonly IConfiguration _config;

//         public HRController(AppDbContext context, IEmailService emailService, IConfiguration config)
//         {
//             _context = context;
//             _emailService = emailService;
//             _config = config;
//         }

//         private int GetHRId()
//         {
//             return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
//         }

//         [HttpPost("interviews/create")]
//         public async Task<ActionResult<ApiResponseDto<InterviewResponseDto>>> CreateInterview([FromBody] CreateInterviewDto dto)
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

//             var hrId = GetHRId();
            
//             // Generate unique meeting link
//             var linkId = Guid.NewGuid().ToString("N");
//             var baseUrl = _config["AppSettings:BaseUrl"] ?? "http://localhost:5173";
//             var meetingLink = $"{baseUrl}?meeting={linkId}";
            
//             var interview = new Interview
//             {
//                 HRId = hrId,
//                 CandidateEmail = dto.CandidateEmail,
//                 MeetingLink = meetingLink,
//                 ScheduledAt = dto.ScheduledAt,
//                 Status = "Scheduled"
//             };

//             _context.Interviews.Add(interview);
//             await _context.SaveChangesAsync();

//             // Send email
//             try
//             {
//                 await _emailService.SendInterviewLinkAsync(
//                     dto.CandidateEmail,
//                     dto.CandidateName,
//                     meetingLink,
//                     dto.ScheduledAt
//                 );
//             }
//             catch (Exception ex)
//             {
//                 // Log error but don't fail the interview creation
//                 Console.WriteLine($"Failed to send email: {ex.Message}");
//             }

//             return Ok(new ApiResponseDto<InterviewResponseDto>
//             {
//                 Success = true,
//                 Message = "Interview created successfully",
//                 Data = new InterviewResponseDto
//                 {
//                     Id = interview.Id,
//                     CandidateEmail = interview.CandidateEmail,
//                     MeetingLink = interview.MeetingLink,
//                     ScheduledAt = interview.ScheduledAt,
//                     Status = interview.Status,
//                     CreatedAt = interview.CreatedAt,
//                     AlertCount = 0,
//                     HasScorecard = false
//                 }
//             });
//         }

//         [HttpGet("interviews")]
//         public async Task<ActionResult<List<InterviewResponseDto>>> GetInterviews()
//         {
//             var hrId = GetHRId();
            
//             var interviews = await _context.Interviews
//                 .Where(i => i.HRId == hrId)
//                 .OrderByDescending(i => i.ScheduledAt)
//                 .Select(i => new InterviewResponseDto
//                 {
//                     Id = i.Id,
//                     CandidateEmail = i.CandidateEmail,
//                     MeetingLink = i.MeetingLink,
//                     ScheduledAt = i.ScheduledAt,
//                     Status = i.Status,
//                     CreatedAt = i.CreatedAt,
//                     AlertCount = _context.InterviewLogs.Count(l => l.InterviewId == i.Id),
//                     HasScorecard = _context.Scorecards.Any(s => s.InterviewId == i.Id)
//                 })
//                 .ToListAsync();

//             return Ok(interviews);
//         }

//         [HttpGet("interviews/{id}")]
//         public async Task<ActionResult<InterviewDetailDto>> GetInterview(int id)
//         {
//             var interview = await _context.Interviews
//                 .Include(i => i.HR)
//                 .FirstOrDefaultAsync(i => i.Id == id);

//             if (interview == null)
//                 return NotFound(new ApiResponseDto { Success = false, Message = "Interview not found" });

//             var logs = await _context.InterviewLogs
//                 .Where(l => l.InterviewId == id)
//                 .OrderByDescending(l => l.Timestamp)
//                 .Select(l => new InterviewLogDto
//                 {
//                     Id = l.Id,
//                     LogType = l.LogType,
//                     Message = l.Message,
//                     Timestamp = l.Timestamp
//                 })
//                 .ToListAsync();

//             var scorecard = await _context.Scorecards
//                 .Where(s => s.InterviewId == id)
//                 .Select(s => new ScorecardDto
//                 {
//                     InterviewId = s.InterviewId,
//                     Communication = s.Communication,
//                     Technical = s.Technical,
//                     Coding = s.Coding,
//                     Attitude = s.Attitude,
//                     FinalDecision = s.FinalDecision,
//                     Comments = s.Comments
//                 })
//                 .FirstOrDefaultAsync();

//             var whiteboards = await _context.Whiteboards
//                 .Where(w => w.InterviewId == id)
//                 .Select(w => new WhiteboardDto
//                 {
//                     Id = w.Id,
//                     ImageUrl = w.ImageUrl,
//                     CreatedAt = w.CreatedAt
//                 })
//                 .ToListAsync();

//             return Ok(new InterviewDetailDto
//             {
//                 Id = interview.Id,
//                 CandidateEmail = interview.CandidateEmail,
//                 MeetingLink = interview.MeetingLink,
//                 ScheduledAt = interview.ScheduledAt,
//                 Status = interview.Status,
//                 HR = interview.HR != null ? new HRInfoDto
//                 {
//                     Id = interview.HR.Id,
//                     Name = interview.HR.Name,
//                     Email = interview.HR.Email
//                 } : null,
//                 Logs = logs,
//                 Scorecard = scorecard,
//                 Whiteboards = whiteboards
//             });
//         }

//         [HttpPost("scorecard/save")]
//         public async Task<ActionResult<ApiResponseDto>> SaveScorecard([FromBody] ScorecardDto dto)
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

//             var existing = await _context.Scorecards
//                 .FirstOrDefaultAsync(s => s.InterviewId == dto.InterviewId);

//             if (existing != null)
//             {
//                 existing.Communication = dto.Communication;
//                 existing.Technical = dto.Technical;
//                 existing.Coding = dto.Coding;
//                 existing.Attitude = dto.Attitude;
//                 existing.FinalDecision = dto.FinalDecision;
//                 existing.Comments = dto.Comments;
//             }
//             else
//             {
//                 var scorecard = new Scorecard
//                 {
//                     InterviewId = dto.InterviewId,
//                     Communication = dto.Communication,
//                     Technical = dto.Technical,
//                     Coding = dto.Coding,
//                     Attitude = dto.Attitude,
//                     FinalDecision = dto.FinalDecision,
//                     Comments = dto.Comments
//                 };
//                 _context.Scorecards.Add(scorecard);
//             }

//             await _context.SaveChangesAsync();
            
//             return Ok(new ApiResponseDto
//             {
//                 Success = true,
//                 Message = "Scorecard saved successfully"
//             });
//         }

//         [HttpGet("scorecard/{interviewId}")]
//         public async Task<ActionResult<ScorecardDto>> GetScorecard(int interviewId)
//         {
//             var scorecard = await _context.Scorecards
//                 .Where(s => s.InterviewId == interviewId)
//                 .Select(s => new ScorecardDto
//                 {
//                     InterviewId = s.InterviewId,
//                     Communication = s.Communication,
//                     Technical = s.Technical,
//                     Coding = s.Coding,
//                     Attitude = s.Attitude,
//                     FinalDecision = s.FinalDecision,
//                     Comments = s.Comments
//                 })
//                 .FirstOrDefaultAsync();

//             if (scorecard == null)
//                 return NotFound(new ApiResponseDto { Success = false, Message = "Scorecard not found" });

//             return Ok(scorecard);
//         }

//         [HttpGet("dashboard/stats")]
//         public async Task<ActionResult<DashboardStatsDto>> GetDashboardStats()
//         {
//             var hrId = GetHRId();

//             var interviews = await _context.Interviews
//                 .Where(i => i.HRId == hrId)
//                 .ToListAsync();

//             var scorecards = await _context.Scorecards
//                 .Where(s => interviews.Select(i => i.Id).Contains(s.InterviewId))
//                 .ToListAsync();

//             var recentInterviews = await _context.Interviews
//                 .Where(i => i.HRId == hrId)
//                 .OrderByDescending(i => i.ScheduledAt)
//                 .Take(5)
//                 .Select(i => new RecentInterviewDto
//                 {
//                     Id = i.Id,
//                     CandidateEmail = i.CandidateEmail,
//                     ScheduledAt = i.ScheduledAt,
//                     Status = i.Status,
//                     AlertCount = _context.InterviewLogs.Count(l => l.InterviewId == i.Id)
//                 })
//                 .ToListAsync();

//             return Ok(new DashboardStatsDto
//             {
//                 TotalInterviews = interviews.Count,
//                 ScheduledInterviews = interviews.Count(i => i.Status == "Scheduled"),
//                 CompletedInterviews = interviews.Count(i => i.Status == "Completed"),
//                 PendingInterviews = interviews.Count(i => i.Status == "Pending"),
//                 TotalCandidates = interviews.Select(i => i.CandidateEmail).Distinct().Count(),
//                 SelectedCandidates = scorecards.Count(s => s.FinalDecision == "Selected"),
//                 RejectedCandidates = scorecards.Count(s => s.FinalDecision == "Rejected"),
//                 RecentInterviews = recentInterviews
//             });
//         }
//     }
// }


// Controllers/HRController.cs - Updated CreateInterview Method
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRInterview.API.Data;
using HRInterview.API.Models;
using HRInterview.API.DTOs;
using HRInterview.API.Services;
using System.Security.Claims;

namespace HRInterview.API.Controllers
{
    [Authorize(Roles = "HR")]
    [ApiController]
    [Route("api/hr")]
    public class HRController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _config;

        public HRController(AppDbContext context, IEmailService emailService, IConfiguration config)
        {
            _context = context;
            _emailService = emailService;
            _config = config;
        }

        private int GetHRId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }

        // Controllers/HRController.cs - Fixed CreateInterview Method
[HttpPost("interviews/create")]
public async Task<ActionResult<ApiResponseDto<InterviewResponseDto>>> CreateInterview([FromBody] CreateInterviewDto dto)
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

    var hrId = GetHRId();
    
    Console.WriteLine($"[DEBUG] HR ID from token: {hrId}");
    
    // ✅ VALIDATE HR USER EXISTS
    var hrUser = await _context.Users.FindAsync(hrId);
    if (hrUser == null)
    {
        Console.WriteLine($"[ERROR] HR user with ID {hrId} not found in database");
        
        // Check if ANY users exist
        var userCount = await _context.Users.CountAsync();
        Console.WriteLine($"[DEBUG] Total users in database: {userCount}");
        
        return BadRequest(new ApiResponseDto
        {
            Success = false,
            Message = $"HR user not found (ID: {hrId}). Please log in again or contact support."
        });
    }
    
    Console.WriteLine($"[DEBUG] HR user found: {hrUser.Email} (Role: {hrUser.Role})");
    
    // Generate unique meeting ID (shorter and cleaner)
    var meetingId = GenerateMeetingId();
    var baseUrl = _config["AppSettings:BaseUrl"] ?? "http://localhost:5173";
    var meetingLink = $"{baseUrl}/join/{meetingId}";
    
    var interview = new Interview
    {
        HRId = hrId,
        CandidateEmail = dto.CandidateEmail,
        MeetingLink = meetingLink,
        ScheduledAt = DateTime.SpecifyKind(dto.ScheduledAt, DateTimeKind.Utc),
        CreatedAt = DateTime.UtcNow,
        Status = "Scheduled"
    };

    _context.Interviews.Add(interview);
    
    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateException ex)
    {
        return StatusCode(500, new ApiResponseDto
        {
            Success = false,
            Message = "Failed to create interview. Please try again.",
            Errors = new List<string> { ex.InnerException?.Message ?? ex.Message }
        });
    }

    // Send email with meeting ID
    try
    {
        await _emailService.SendInterviewLinkWithIdAsync(
            dto.CandidateEmail,
            dto.CandidateName,
            meetingId,
            meetingLink,
            dto.ScheduledAt
        );
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Failed to send email: {ex.Message}");
    }

    return Ok(new ApiResponseDto<InterviewResponseDto>
    {
        Success = true,
        Message = "Interview created successfully. Meeting link sent to candidate.",
        Data = new InterviewResponseDto
        {
            Id = interview.Id,
            CandidateEmail = interview.CandidateEmail,
            MeetingLink = meetingLink,
            ScheduledAt = interview.ScheduledAt,
            Status = interview.Status,
            CreatedAt = interview.CreatedAt,
            AlertCount = 0,
            HasScorecard = false
        }
    });
}

// Generate a clean, easy-to-type meeting ID
private string GenerateMeetingId()
{
    const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Exclude confusing characters
    var random = new Random();
    
    // Format: XXX-XXX-XXX (e.g., ABC-123-XYZ)
    var part1 = new string(Enumerable.Range(0, 3).Select(_ => chars[random.Next(chars.Length)]).ToArray());
    var part2 = new string(Enumerable.Range(0, 3).Select(_ => chars[random.Next(chars.Length)]).ToArray());
    var part3 = new string(Enumerable.Range(0, 3).Select(_ => chars[random.Next(chars.Length)]).ToArray());
    
    return $"{part1}-{part2}-{part3}";
}

        [HttpGet("interviews")]
        public async Task<ActionResult<List<InterviewResponseDto>>> GetInterviews()
        {
            var hrId = GetHRId();
            
            var interviews = await _context.Interviews
                .Where(i => i.HRId == hrId)
                .OrderByDescending(i => i.ScheduledAt)
                .Select(i => new InterviewResponseDto
                {
                    Id = i.Id,
                    CandidateEmail = i.CandidateEmail,
                    MeetingLink = i.MeetingLink,
                    ScheduledAt = i.ScheduledAt,
                    Status = i.Status,
                    CreatedAt = i.CreatedAt,
                    AlertCount = _context.InterviewLogs.Count(l => l.InterviewId == i.Id),
                    HasScorecard = _context.Scorecards.Any(s => s.InterviewId == i.Id)
                })
                .ToListAsync();

            return Ok(interviews);
        }

        [HttpGet("interviews/{id}")]
        public async Task<ActionResult<InterviewDetailDto>> GetInterview(int id)
        {
            var interview = await _context.Interviews
                .FirstOrDefaultAsync(i => i.Id == id);

            if (interview == null)
                return NotFound(new ApiResponseDto { Success = false, Message = "Interview not found" });

            var logs = await _context.InterviewLogs
                .Where(l => l.InterviewId == id)
                .OrderByDescending(l => l.Timestamp)
                .Select(l => new InterviewLogDto
                {
                    Id = l.Id,
                    LogType = l.LogType,
                    Message = l.Message,
                    Timestamp = l.Timestamp
                })
                .ToListAsync();

            var scorecard = await _context.Scorecards
                .Where(s => s.InterviewId == id)
                .Select(s => new ScorecardDto
                {
                    InterviewId = s.InterviewId,
                    Communication = s.Communication,
                    Technical = s.Technical,
                    Coding = s.Coding,
                    Attitude = s.Attitude,
                    FinalDecision = s.FinalDecision,
                    Comments = s.Comments
                })
                .FirstOrDefaultAsync();

            return Ok(new InterviewDetailDto
            {
                Id = interview.Id,
                CandidateEmail = interview.CandidateEmail,
                MeetingLink = interview.MeetingLink,
                ScheduledAt = interview.ScheduledAt,
                Status = interview.Status,
                Logs = logs,
                Scorecard = scorecard
            });
        }

        [HttpPost("scorecard/save")]
        public async Task<ActionResult<ApiResponseDto>> SaveScorecard([FromBody] ScorecardDto dto)
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

            var existing = await _context.Scorecards
                .FirstOrDefaultAsync(s => s.InterviewId == dto.InterviewId);

            if (existing != null)
            {
                existing.Communication = dto.Communication;
                existing.Technical = dto.Technical;
                existing.Coding = dto.Coding;
                existing.Attitude = dto.Attitude;
                existing.FinalDecision = dto.FinalDecision;
                existing.Comments = dto.Comments;
            }
            else
            {
                var scorecard = new Scorecard
                {
                    InterviewId = dto.InterviewId,
                    Communication = dto.Communication,
                    Technical = dto.Technical,
                    Coding = dto.Coding,
                    Attitude = dto.Attitude,
                    FinalDecision = dto.FinalDecision,
                    Comments = dto.Comments
                };
                _context.Scorecards.Add(scorecard);
            }

            await _context.SaveChangesAsync();
            
            return Ok(new ApiResponseDto
            {
                Success = true,
                Message = "Scorecard saved successfully"
            });
        }

        [HttpGet("scorecard/{interviewId}")]
        public async Task<ActionResult<ScorecardDto>> GetScorecard(int interviewId)
        {
            var scorecard = await _context.Scorecards
                .Where(s => s.InterviewId == interviewId)
                .Select(s => new ScorecardDto
                {
                    InterviewId = s.InterviewId,
                    Communication = s.Communication,
                    Technical = s.Technical,
                    Coding = s.Coding,
                    Attitude = s.Attitude,
                    FinalDecision = s.FinalDecision,
                    Comments = s.Comments
                })
                .FirstOrDefaultAsync();

            if (scorecard == null)
                return NotFound(new ApiResponseDto { Success = false, Message = "Scorecard not found" });

            return Ok(scorecard);
        }
    }
}