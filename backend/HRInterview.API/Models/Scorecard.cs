namespace HRInterview.API.Models
{
    public class Scorecard
    {
        public int Id { get; set; }
        public int InterviewId { get; set; }
        public int Communication { get; set; }
        public int Technical { get; set; }
        public int Coding { get; set; }
        public int Attitude { get; set; }
        public string FinalDecision { get; set; } = "Pending"; // Selected, Rejected, Pending
        public string? Comments { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public Interview? Interview { get; set; }
    }
}