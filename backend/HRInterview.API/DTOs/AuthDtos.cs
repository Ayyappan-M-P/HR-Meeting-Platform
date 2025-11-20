// // DTOs/AuthDtos.cs - All Authentication DTOs
// using System.ComponentModel.DataAnnotations;

// namespace HRInterview.API.DTOs
// {
//     // Login DTO
//     public class LoginDto
//     {
//         [Required(ErrorMessage = "Email is required")]
//         [EmailAddress(ErrorMessage = "Invalid email format")]
//         public string Email { get; set; } = string.Empty;

//         [Required(ErrorMessage = "Password is required")]
//         public string Password { get; set; } = string.Empty;
//     }

//     // Candidate Login DTO
//     public class CandidateLoginDto
//     {
//         [Required(ErrorMessage = "Email is required")]
//         [EmailAddress(ErrorMessage = "Invalid email format")]
//         public string Email { get; set; } = string.Empty;

//         [Required(ErrorMessage = "Meeting ID is required")]
//         public string MeetingId { get; set; } = string.Empty;

//         public string? Name { get; set; }
//         public string? ResumeUrl { get; set; }
//     }

//     // Auth Response DTO
//     public class AuthResponseDto
//     {
//         public string Token { get; set; } = string.Empty;
//         public UserDto User { get; set; } = null!;
//     }

//     // Candidate Auth Response DTO
//     public class CandidateAuthResponseDto
//     {
//         public string Token { get; set; } = string.Empty;
//         public CandidateDto Candidate { get; set; } = null!;
//         public InterviewResponseDto Interview { get; set; } = null!;
//         public string HRName { get; set; } = string.Empty;
//     }

//     // User DTO
//     public class UserDto
//     {
//         public int Id { get; set; }
//         public string Name { get; set; } = string.Empty;
//         public string Email { get; set; } = string.Empty;
//         public string Role { get; set; } = string.Empty;
//     }

//     // Candidate DTO
//     public class CandidateDto
//     {
//         public int Id { get; set; }
//         public string Name { get; set; } = string.Empty;
//         public string Email { get; set; } = string.Empty;
//         public string Role { get; set; } = string.Empty;
//     }

//     // Interview Response DTO
//     public class InterviewResponseDto
//     {
//         public int Id { get; set; }
//         public string CandidateEmail { get; set; } = string.Empty;
//         public string MeetingLink { get; set; } = string.Empty;
//         public DateTime ScheduledAt { get; set; }
//         public string Status { get; set; } = string.Empty;
//         public DateTime CreatedAt { get; set; }
//         public int AlertCount { get; set; }
//         public bool HasScorecard { get; set; }
//     }

//     // API Response DTO
//     public class ApiResponseDto
//     {
//         public bool Success { get; set; }
//         public string Message { get; set; } = string.Empty;
//         public List<string> Errors { get; set; } = new();
//     }

//     public class ApiResponseDto<T> : ApiResponseDto
//     {
//         public T? Data { get; set; }
//     }

//     // Scorecard DTO
//     public class ScorecardDto
//     {
//         public int InterviewId { get; set; }
//         public int Communication { get; set; }
//         public int Technical { get; set; }
//         public int Coding { get; set; }
//         public int Attitude { get; set; }
//         public string FinalDecision { get; set; } = string.Empty;
//         public string Comments { get; set; } = string.Empty;
//     }
// }