// DTOs/JoinMeetingDto.cs
using System.ComponentModel.DataAnnotations;

namespace HRInterview.API.DTOs
{
    public class JoinMeetingDto
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string? ResumeUrl { get; set; }
    }
}
