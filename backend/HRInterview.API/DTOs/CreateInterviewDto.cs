// DTOs/CreateInterviewDto.cs
using System.ComponentModel.DataAnnotations;

namespace HRInterview.API.DTOs
{
    public class CreateInterviewDto
    {
        [Required(ErrorMessage = "Candidate email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string CandidateEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Candidate name is required")]
        [StringLength(255, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 255 characters")]
        public string CandidateName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Scheduled date and time is required")]
        public DateTime ScheduledAt { get; set; }
    }
}