// DTOs/SaveWhiteboardDto.cs
using System.ComponentModel.DataAnnotations;

namespace HRInterview.API.DTOs
{
    public class SaveWhiteboardDto
    {
        [Required]
        public int InterviewId { get; set; }

        [Required]
        public string ImageData { get; set; } = string.Empty;
    }
}