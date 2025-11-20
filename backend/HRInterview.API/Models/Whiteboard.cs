namespace HRInterview.API.Models
{
    public class Whiteboard
    {
        public int Id { get; set; }
        public int InterviewId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public Interview? Interview { get; set; }
    }
}