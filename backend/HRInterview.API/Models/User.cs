namespace HRInterview.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Password { get; set; }
        public string Role { get; set; } = "Candidate"; // HR or Candidate
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}