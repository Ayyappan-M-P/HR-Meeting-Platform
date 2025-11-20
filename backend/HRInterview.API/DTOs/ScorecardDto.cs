using System.ComponentModel.DataAnnotations;

namespace HRInterview.API.DTOs
{
    public class ScorecardDto
    {
        [Required]
        public int InterviewId { get; set; }

        [Required]
        [Range(1, 10, ErrorMessage = "Communication score must be between 1 and 10")]
        public int Communication { get; set; }

        [Required]
        [Range(1, 10, ErrorMessage = "Technical score must be between 1 and 10")]
        public int Technical { get; set; }

        [Required]
        [Range(1, 10, ErrorMessage = "Coding score must be between 1 and 10")]
        public int Coding { get; set; }

        [Required]
        [Range(1, 10, ErrorMessage = "Attitude score must be between 1 and 10")]
        public int Attitude { get; set; }

        [Required]
        [RegularExpression("Selected|Rejected|Pending", ErrorMessage = "Final decision must be Selected, Rejected, or Pending")]
        public string FinalDecision { get; set; } = "Pending";

        [StringLength(2000, ErrorMessage = "Comments cannot exceed 2000 characters")]
        public string? Comments { get; set; }
    }
}