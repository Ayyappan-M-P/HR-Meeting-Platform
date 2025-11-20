// DTOs/InterviewDetailDto.cs
namespace HRInterview.API.DTOs
{
    public class InterviewDetailDto
    {
        public int Id { get; set; }
        public string CandidateEmail { get; set; } = string.Empty;
        public string MeetingLink { get; set; } = string.Empty;
        public DateTime ScheduledAt { get; set; }
        public string Status { get; set; } = string.Empty;
        public HRInfoDto? HR { get; set; }
        public List<InterviewLogDto> Logs { get; set; } = new();
        public ScorecardDto? Scorecard { get; set; }
        public List<WhiteboardDto> Whiteboards { get; set; } = new();
    }

    public class HRInfoDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class InterviewLogDto
    {
        public int Id { get; set; }
        public string LogType { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }

    public class WhiteboardDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
