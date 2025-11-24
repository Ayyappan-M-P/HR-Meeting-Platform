// namespace HRInterview.API.Models
// {
//     public class Scorecard
//     {
//         public int Id { get; set; }
//         public int InterviewId { get; set; }
//         public int Communication { get; set; }
//         public int Technical { get; set; }
//         public int Coding { get; set; }
//         public int Attitude { get; set; }
//         public string FinalDecision { get; set; } = "Pending"; // Selected, Rejected, Pending
//         public string? Comments { get; set; }
//         public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
//         public Interview? Interview { get; set; }
//     }
// }

namespace HRInterview.API.Models
{
    public class Scorecard
    {
        public int Id { get; set; }
        public int InterviewId { get; set; }

        // Existing fields
        public int Communication { get; set; }
        public int Technical { get; set; }
        public int Coding { get; set; }
        public int Attitude { get; set; }
        public string FinalDecision { get; set; } = "Pending";
        public string? Comments { get; set; }

        // NEW FIELDS
        public int Score { get; set; }       // overall score (0–100)
        public string? Notes { get; set; }   // HR notes / observations

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Interview? Interview { get; set; }
    }
}
