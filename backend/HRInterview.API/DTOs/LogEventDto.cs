// DTOs/LogEventDto.cs
using System.ComponentModel.DataAnnotations;

namespace HRInterview.API.DTOs
{
    public class LogEventDto
    {
        [Required]
        public int InterviewId { get; set; }

        [Required]
        [RegularExpression("face_detection|tab_switch|mobile_usage", 
            ErrorMessage = "Log type must be face_detection, tab_switch, or mobile_usage")]
        public string LogType { get; set; } = string.Empty;

        [Required]
        [StringLength(1000, ErrorMessage = "Message cannot exceed 1000 characters")]
        public string Message { get; set; } = string.Empty;
    }
}
