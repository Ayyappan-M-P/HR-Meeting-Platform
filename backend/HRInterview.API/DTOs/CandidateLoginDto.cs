// DTOs/CandidateLoginDto.cs
using System.ComponentModel.DataAnnotations;

namespace HRInterview.API.DTOs
{
    public class CandidateLoginDto
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Meeting ID is required")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Meeting ID must be at least 8 characters")]
        public string MeetingId { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Name { get; set; }

        [StringLength(500)]
        public string? ResumeUrl { get; set; }
    }
}

// DTOs/CandidateAuthResponseDto.cs
namespace HRInterview.API.DTOs
{
    public class CandidateAuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public CandidateDto Candidate { get; set; } = new();
        public InterviewResponseDto Interview { get; set; } = new();
        public string HRName { get; set; } = string.Empty;
    }

    public class CandidateDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "Candidate";
    }
}