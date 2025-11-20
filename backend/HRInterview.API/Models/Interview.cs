namespace HRInterview.API.Models
{
    public class Interview
    {
        public int Id { get; set; }
        public int HRId { get; set; }
        public string CandidateEmail { get; set; } = string.Empty;
        public string MeetingLink { get; set; } = string.Empty;
        public DateTime ScheduledAt { get; set; }
        public string Status { get; set; } = "Scheduled";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public User? HR { get; set; }
    }
}