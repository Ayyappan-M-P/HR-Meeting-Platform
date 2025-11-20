// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using HRInterview.API.Data;
// using HRInterview.API.Models;

// namespace HRInterview.API.Controllers
// {
//     [ApiController]
//     [Route("api/candidate")]
//     public class CandidateController : ControllerBase
//     {
//         private readonly AppDbContext _context;

//         public CandidateController(AppDbContext context)
//         {
//             _context = context;
//         }

//         [HttpGet("join/{meetingLink}")]
//         public async Task<IActionResult> JoinMeeting(string meetingLink)
//         {
//             var interview = await _context.Interviews
//                 .FirstOrDefaultAsync(i => i.MeetingLink.Contains(meetingLink));

//             if (interview == null)
//                 return NotFound(new { message = "Invalid meeting link" });

//             return Ok(new
//             {
//                 interview.Id,
//                 interview.CandidateEmail,
//                 interview.ScheduledAt,
//                 interview.Status
//             });
//         }

//         [HttpPost("log-event")]
//         public async Task<IActionResult> LogEvent([FromBody] LogEventDto dto)
//         {
//             var log = new InterviewLog
//             {
//                 InterviewId = dto.InterviewId,
//                 LogType = dto.LogType,
//                 Message = dto.Message
//             };

//             _context.InterviewLogs.Add(log);
//             await _context.SaveChangesAsync();

//             return Ok(new { message = "Event logged" });
//         }
//     }

//     public class LogEventDto
//     {
//         public int InterviewId { get; set; }
//         public string LogType { get; set; } = string.Empty;
//         public string Message { get; set; } = string.Empty;
//     }
// }

// Controllers/CandidateController.cs - Updated
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRInterview.API.Data;
using HRInterview.API.Models;
using HRInterview.API.DTOs;

namespace HRInterview.API.Controllers
{
    [ApiController]
    [Route("api/candidate")]
    public class CandidateController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CandidateController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("join/{meetingLink}")]
        public async Task<ActionResult<InterviewResponseDto>> JoinMeeting(string meetingLink)
        {
            var interview = await _context.Interviews
                .FirstOrDefaultAsync(i => i.MeetingLink.Contains(meetingLink));

            if (interview == null)
            {
                return NotFound(new ApiResponseDto
                {
                    Success = false,
                    Message = "Invalid or expired meeting link"
                });
            }

            return Ok(new InterviewResponseDto
            {
                Id = interview.Id,
                CandidateEmail = interview.CandidateEmail,
                MeetingLink = interview.MeetingLink,
                ScheduledAt = interview.ScheduledAt,
                Status = interview.Status,
                CreatedAt = interview.CreatedAt,
                AlertCount = 0,
                HasScorecard = false
            });
        }

        [HttpPost("log-event")]
        public async Task<ActionResult<ApiResponseDto>> LogEvent([FromBody] LogEventDto dto)
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

            var log = new InterviewLog
            {
                InterviewId = dto.InterviewId,
                LogType = dto.LogType,
                Message = dto.Message,
                Timestamp = DateTime.UtcNow
            };

            _context.InterviewLogs.Add(log);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponseDto
            {
                Success = true,
                Message = "Event logged successfully"
            });
        }
    }
}