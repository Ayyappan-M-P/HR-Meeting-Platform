namespace HRInterview.API.Models
{
    public class InterviewLog
    {
        public int Id { get; set; }
        public int InterviewId { get; set; }
        public string LogType { get; set; } = string.Empty; // face_detection, tab_switch, mobile_usage
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        
        public Interview? Interview { get; set; }
    }
}