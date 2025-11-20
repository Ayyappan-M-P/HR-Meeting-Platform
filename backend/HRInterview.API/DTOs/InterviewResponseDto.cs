// DTOs/InterviewResponseDto.cs
namespace HRInterview.API.DTOs
{
    public class InterviewResponseDto
    {
        public int Id { get; set; }
        public string CandidateEmail { get; set; } = string.Empty;
        public string MeetingLink { get; set; } = string.Empty;
        public DateTime ScheduledAt { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public int AlertCount { get; set; }
        public bool HasScorecard { get; set; }
    }
}