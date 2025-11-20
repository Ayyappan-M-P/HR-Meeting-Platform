// DTOs/DashboardStatsDto.cs
namespace HRInterview.API.DTOs
{
    public class DashboardStatsDto
    {
        public int TotalInterviews { get; set; }
        public int ScheduledInterviews { get; set; }
        public int CompletedInterviews { get; set; }
        public int PendingInterviews { get; set; }
        public int TotalCandidates { get; set; }
        public int SelectedCandidates { get; set; }
        public int RejectedCandidates { get; set; }
        public List<RecentInterviewDto> RecentInterviews { get; set; } = new();
    }

    public class RecentInterviewDto
    {
        public int Id { get; set; }
        public string CandidateEmail { get; set; } = string.Empty;
        public DateTime ScheduledAt { get; set; }
        public string Status { get; set; } = string.Empty;
        public int AlertCount { get; set; }
    }
}