// // Controllers/WaitingRoomController.cs - NEW FILE
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using HRInterview.API.Data;
// using HRInterview.API.Models;
// using HRInterview.API.DTOs;
// using System.Collections.Concurrent;

// namespace HRInterview.API.Controllers
// {
//     [ApiController]
//     [Route("api/waiting-room")]
//     public class WaitingRoomController : ControllerBase
//     {
//         private readonly AppDbContext _context;
        
//         // In-memory storage for waiting candidates (use Redis/SignalR in production)
//         private static readonly ConcurrentDictionary<string, WaitingCandidate> _waitingCandidates = new();
//         private static readonly ConcurrentDictionary<int, bool> _hrInMeeting = new();

//         public WaitingRoomController(AppDbContext context)
//         {
//             _context = context;
//         }

//         // Candidate joins waiting room
//         [HttpPost("join")]
//         public async Task<ActionResult<ApiResponseDto>> JoinWaitingRoom([FromBody] JoinWaitingRoomDto dto)
//         {
//             try
//             {
//                 Console.WriteLine($"[DEBUG] Candidate joining waiting room - Email: {dto.CandidateEmail}, InterviewId: {dto.InterviewId}");

//                 // Verify interview exists
//                 var interview = await _context.Interviews
//                     .FirstOrDefaultAsync(i => i.Id == dto.InterviewId);

//                 if (interview == null)
//                 {
//                     return NotFound(new ApiResponseDto
//                     {
//                         Success = false,
//                         Message = "Interview not found"
//                     });
//                 }

//                 // Add to waiting room
//                 var waitingCandidate = new WaitingCandidate
//                 {
//                     InterviewId = dto.InterviewId,
//                     CandidateEmail = dto.CandidateEmail,
//                     CandidateName = dto.CandidateName,
//                     JoinedAt = DateTime.UtcNow,
//                     IsAdmitted = false
//                 };

//                 var key = $"{dto.InterviewId}_{dto.CandidateEmail}";
//                 _waitingCandidates[key] = waitingCandidate;

//                 Console.WriteLine($"[DEBUG] Candidate added to waiting room. Total waiting: {_waitingCandidates.Count}");

//                 return Ok(new ApiResponseDto
//                 {
//                     Success = true,
//                     Message = "Joined waiting room successfully"
//                 });
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"[ERROR] Failed to join waiting room: {ex.Message}");
//                 return StatusCode(500, new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Failed to join waiting room"
//                 });
//             }
//         }

//         // HR joins meeting room
//         [HttpPost("hr-join")]
//         public ActionResult<ApiResponseDto> HRJoinMeeting([FromBody] HRJoinMeetingDto dto)
//         {
//             try
//             {
//                 Console.WriteLine($"[DEBUG] HR joining meeting - InterviewId: {dto.InterviewId}");
//                 _hrInMeeting[dto.InterviewId] = true;

//                 return Ok(new ApiResponseDto
//                 {
//                     Success = true,
//                     Message = "HR joined meeting successfully"
//                 });
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"[ERROR] Failed to join meeting: {ex.Message}");
//                 return StatusCode(500, new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Failed to join meeting"
//                 });
//             }
//         }

//         // Get waiting candidates for HR
//         [HttpGet("candidates/{interviewId}")]
//         public ActionResult<List<WaitingCandidateDto>> GetWaitingCandidates(int interviewId)
//         {
//             try
//             {
//                 var candidates = _waitingCandidates.Values
//                     .Where(c => c.InterviewId == interviewId && !c.IsAdmitted)
//                     .Select(c => new WaitingCandidateDto
//                     {
//                         InterviewId = c.InterviewId,
//                         CandidateEmail = c.CandidateEmail,
//                         CandidateName = c.CandidateName,
//                         JoinedAt = c.JoinedAt,
//                         WaitingMinutes = (int)(DateTime.UtcNow - c.JoinedAt).TotalMinutes
//                     })
//                     .ToList();

//                 Console.WriteLine($"[DEBUG] Returning {candidates.Count} waiting candidates for interview {interviewId}");

//                 return Ok(candidates);
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"[ERROR] Failed to get waiting candidates: {ex.Message}");
//                 return StatusCode(500, new List<WaitingCandidateDto>());
//             }
//         }

//         // HR admits candidate
//         [HttpPost("admit")]
//         public async Task<ActionResult<ApiResponseDto>> AdmitCandidate([FromBody] AdmitCandidateDto dto)
//         {
//             try
//             {
//                 Console.WriteLine($"[DEBUG] Admitting candidate - Email: {dto.CandidateEmail}, InterviewId: {dto.InterviewId}");

//                 var key = $"{dto.InterviewId}_{dto.CandidateEmail}";
                
//                 if (_waitingCandidates.TryGetValue(key, out var candidate))
//                 {
//                     candidate.IsAdmitted = true;
//                     candidate.AdmittedAt = DateTime.UtcNow;

//                     // Update interview status
//                     var interview = await _context.Interviews.FindAsync(dto.InterviewId);
//                     if (interview != null)
//                     {
//                         interview.Status = "In Progress";
//                         await _context.SaveChangesAsync();
//                     }

//                     Console.WriteLine($"[DEBUG] Candidate admitted successfully");

//                     return Ok(new ApiResponseDto
//                     {
//                         Success = true,
//                         Message = "Candidate admitted successfully"
//                     });
//                 }

//                 return NotFound(new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Candidate not found in waiting room"
//                 });
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"[ERROR] Failed to admit candidate: {ex.Message}");
//                 return StatusCode(500, new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Failed to admit candidate"
//                 });
//             }
//         }

//         // Check if candidate is admitted (for polling)
//         [HttpGet("status/{interviewId}/{candidateEmail}")]
//         public ActionResult<CandidateStatusDto> GetCandidateStatus(int interviewId, string candidateEmail)
//         {
//             try
//             {
//                 var key = $"{interviewId}_{candidateEmail}";
                
//                 if (_waitingCandidates.TryGetValue(key, out var candidate))
//                 {
//                     return Ok(new CandidateStatusDto
//                     {
//                         IsAdmitted = candidate.IsAdmitted,
//                         IsHRInMeeting = _hrInMeeting.ContainsKey(interviewId) && _hrInMeeting[interviewId]
//                     });
//                 }

//                 return Ok(new CandidateStatusDto
//                 {
//                     IsAdmitted = false,
//                     IsHRInMeeting = _hrInMeeting.ContainsKey(interviewId) && _hrInMeeting[interviewId]
//                 });
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"[ERROR] Failed to get candidate status: {ex.Message}");
//                 return StatusCode(500, new CandidateStatusDto { IsAdmitted = false, IsHRInMeeting = false });
//             }
//         }

//         // Leave waiting room
//         [HttpPost("leave")]
//         public ActionResult<ApiResponseDto> LeaveWaitingRoom([FromBody] LeaveWaitingRoomDto dto)
//         {
//             try
//             {
//                 var key = $"{dto.InterviewId}_{dto.CandidateEmail}";
//                 _waitingCandidates.TryRemove(key, out _);

//                 return Ok(new ApiResponseDto
//                 {
//                     Success = true,
//                     Message = "Left waiting room"
//                 });
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"[ERROR] Failed to leave waiting room: {ex.Message}");
//                 return StatusCode(500, new ApiResponseDto
//                 {
//                     Success = false,
//                     Message = "Failed to leave waiting room"
//                 });
//             }
//         }
//     }

//     // Helper classes
//     public class WaitingCandidate
//     {
//         public int InterviewId { get; set; }
//         public string CandidateEmail { get; set; } = string.Empty;
//         public string CandidateName { get; set; } = string.Empty;
//         public DateTime JoinedAt { get; set; }
//         public bool IsAdmitted { get; set; }
//         public DateTime? AdmittedAt { get; set; }
//     }
// }

// // DTOs/WaitingRoomDtos.cs - ADD TO YOUR DTOs FOLDER
// namespace HRInterview.API.DTOs
// {
//     public class JoinWaitingRoomDto
//     {
//         public int InterviewId { get; set; }
//         public string CandidateEmail { get; set; } = string.Empty;
//         public string CandidateName { get; set; } = string.Empty;
//     }

//     public class HRJoinMeetingDto
//     {
//         public int InterviewId { get; set; }
//     }

//     public class AdmitCandidateDto
//     {
//         public int InterviewId { get; set; }
//         public string CandidateEmail { get; set; } = string.Empty;
//     }

//     public class WaitingCandidateDto
//     {
//         public int InterviewId { get; set; }
//         public string CandidateEmail { get; set; } = string.Empty;
//         public string CandidateName { get; set; } = string.Empty;
//         public DateTime JoinedAt { get; set; }
//         public int WaitingMinutes { get; set; }
//     }

//     public class CandidateStatusDto
//     {
//         public bool IsAdmitted { get; set; }
//         public bool IsHRInMeeting { get; set; }
//     }

//     public class LeaveWaitingRoomDto
//     {
//         public int InterviewId { get; set; }
//         public string CandidateEmail { get; set; } = string.Empty;
//     }
// }

// Controllers/WaitingRoomController.cs - NEW FILE
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRInterview.API.Data;
using HRInterview.API.Models;
using HRInterview.API.DTOs;
using System.Collections.Concurrent;

namespace HRInterview.API.Controllers
{
    [ApiController]
    [Route("api/waiting-room")]
    public class WaitingRoomController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        // In-memory storage for waiting candidates (use Redis/SignalR in production)
        private static readonly ConcurrentDictionary<string, WaitingCandidate> _waitingCandidates = new();
        private static readonly ConcurrentDictionary<int, bool> _hrInMeeting = new();

        public WaitingRoomController(AppDbContext context)
        {
            _context = context;
        }

        // Candidate joins waiting room
        [HttpPost("join")]
        public async Task<ActionResult<ApiResponseDto>> JoinWaitingRoom([FromBody] JoinWaitingRoomDto dto)
        {
            try
            {
                Console.WriteLine($"[DEBUG] ===== CANDIDATE JOINING WAITING ROOM =====");
                Console.WriteLine($"[DEBUG] Email: {dto.CandidateEmail}");
                Console.WriteLine($"[DEBUG] Name: {dto.CandidateName}");
                Console.WriteLine($"[DEBUG] InterviewId: {dto.InterviewId}");

                // Verify interview exists
                var interview = await _context.Interviews
                    .FirstOrDefaultAsync(i => i.Id == dto.InterviewId);

                if (interview == null)
                {
                    Console.WriteLine($"[ERROR] Interview not found with ID: {dto.InterviewId}");
                    return NotFound(new ApiResponseDto
                    {
                        Success = false,
                        Message = $"Interview not found with ID: {dto.InterviewId}"
                    });
                }

                Console.WriteLine($"[DEBUG] Interview found: {interview.CandidateEmail}, Status: {interview.Status}");

                // Add to waiting room
                var waitingCandidate = new WaitingCandidate
                {
                    InterviewId = dto.InterviewId,
                    CandidateEmail = dto.CandidateEmail,
                    CandidateName = dto.CandidateName,
                    JoinedAt = DateTime.UtcNow,
                    IsAdmitted = false
                };

                var key = $"{dto.InterviewId}_{dto.CandidateEmail}";
                _waitingCandidates[key] = waitingCandidate;

                Console.WriteLine($"[SUCCESS] Candidate added with key: {key}");
                Console.WriteLine($"[DEBUG] Total candidates in waiting room: {_waitingCandidates.Count}");
                Console.WriteLine($"[DEBUG] All keys: {string.Join(", ", _waitingCandidates.Keys)}");

                return Ok(new ApiResponseDto
                {
                    Success = true,
                    Message = "Joined waiting room successfully"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Failed to join waiting room: {ex.Message}");
                Console.WriteLine($"[ERROR] Stack trace: {ex.StackTrace}");
                return StatusCode(500, new ApiResponseDto
                {
                    Success = false,
                    Message = $"Failed to join waiting room: {ex.Message}"
                });
            }
        }

        // HR joins meeting room
        [HttpPost("hr-join")]
        public ActionResult<ApiResponseDto> HRJoinMeeting([FromBody] HRJoinMeetingDto dto)
        {
            try
            {
                Console.WriteLine($"[DEBUG] HR joining meeting - InterviewId: {dto.InterviewId}");
                _hrInMeeting[dto.InterviewId] = true;

                return Ok(new ApiResponseDto
                {
                    Success = true,
                    Message = "HR joined meeting successfully"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Failed to join meeting: {ex.Message}");
                return StatusCode(500, new ApiResponseDto
                {
                    Success = false,
                    Message = "Failed to join meeting"
                });
            }
        }

        // Get waiting candidates for HR
        [HttpGet("candidates/{interviewId}")]
        public ActionResult<List<WaitingCandidateDto>> GetWaitingCandidates(int interviewId)
        {
            try
            {
                var candidates = _waitingCandidates.Values
                    .Where(c => c.InterviewId == interviewId && !c.IsAdmitted)
                    .Select(c => new WaitingCandidateDto
                    {
                        InterviewId = c.InterviewId,
                        CandidateEmail = c.CandidateEmail,
                        CandidateName = c.CandidateName,
                        JoinedAt = c.JoinedAt,
                        WaitingMinutes = (int)(DateTime.UtcNow - c.JoinedAt).TotalMinutes
                    })
                    .ToList();

                Console.WriteLine($"[DEBUG] Returning {candidates.Count} waiting candidates for interview {interviewId}");

                return Ok(candidates);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Failed to get waiting candidates: {ex.Message}");
                return StatusCode(500, new List<WaitingCandidateDto>());
            }
        }

        // HR admits candidate
        [HttpPost("admit")]
        public async Task<ActionResult<ApiResponseDto>> AdmitCandidate([FromBody] AdmitCandidateDto dto)
        {
            try
            {
                Console.WriteLine($"[DEBUG] Admitting candidate - Email: {dto.CandidateEmail}, InterviewId: {dto.InterviewId}");

                var key = $"{dto.InterviewId}_{dto.CandidateEmail}";
                
                if (_waitingCandidates.TryGetValue(key, out var candidate))
                {
                    candidate.IsAdmitted = true;
                    candidate.AdmittedAt = DateTime.UtcNow;

                    // Update interview status
                    var interview = await _context.Interviews.FindAsync(dto.InterviewId);
                    if (interview != null)
                    {
                        interview.Status = "In Progress";
                        await _context.SaveChangesAsync();
                    }

                    Console.WriteLine($"[DEBUG] Candidate admitted successfully");

                    return Ok(new ApiResponseDto
                    {
                        Success = true,
                        Message = "Candidate admitted successfully"
                    });
                }

                return NotFound(new ApiResponseDto
                {
                    Success = false,
                    Message = "Candidate not found in waiting room"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Failed to admit candidate: {ex.Message}");
                return StatusCode(500, new ApiResponseDto
                {
                    Success = false,
                    Message = "Failed to admit candidate"
                });
            }
        }

        // Check if candidate is admitted (for polling)
        [HttpGet("status/{interviewId}/{candidateEmail}")]
        public ActionResult<CandidateStatusDto> GetCandidateStatus(int interviewId, string candidateEmail)
        {
            try
            {
                var key = $"{interviewId}_{candidateEmail}";
                
                if (_waitingCandidates.TryGetValue(key, out var candidate))
                {
                    return Ok(new CandidateStatusDto
                    {
                        IsAdmitted = candidate.IsAdmitted,
                        IsHRInMeeting = _hrInMeeting.ContainsKey(interviewId) && _hrInMeeting[interviewId]
                    });
                }

                return Ok(new CandidateStatusDto
                {
                    IsAdmitted = false,
                    IsHRInMeeting = _hrInMeeting.ContainsKey(interviewId) && _hrInMeeting[interviewId]
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Failed to get candidate status: {ex.Message}");
                return StatusCode(500, new CandidateStatusDto { IsAdmitted = false, IsHRInMeeting = false });
            }
        }

        // Leave waiting room
        [HttpPost("leave")]
        public ActionResult<ApiResponseDto> LeaveWaitingRoom([FromBody] LeaveWaitingRoomDto dto)
        {
            try
            {
                var key = $"{dto.InterviewId}_{dto.CandidateEmail}";
                _waitingCandidates.TryRemove(key, out _);

                return Ok(new ApiResponseDto
                {
                    Success = true,
                    Message = "Left waiting room"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Failed to leave waiting room: {ex.Message}");
                return StatusCode(500, new ApiResponseDto
                {
                    Success = false,
                    Message = "Failed to leave waiting room"
                });
            }
        }
    }

    // Helper classes
    public class WaitingCandidate
    {
        public int InterviewId { get; set; }
        public string CandidateEmail { get; set; } = string.Empty;
        public string CandidateName { get; set; } = string.Empty;
        public DateTime JoinedAt { get; set; }
        public bool IsAdmitted { get; set; }
        public DateTime? AdmittedAt { get; set; }
    }
}
