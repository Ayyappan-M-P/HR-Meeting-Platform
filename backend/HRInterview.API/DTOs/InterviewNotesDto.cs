// DTOs/InterviewNotesDto.cs - NEW FILE
namespace HRInterview.API.DTOs
{
    public class InterviewNotesDto
    {
        public string Notes { get; set; } = string.Empty;
        public List<QuickNoteDto> QuickNotes { get; set; } = new();
        public RatingsDto Ratings { get; set; } = new();
    }

    public class QuickNoteDto
    {
        public long Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public string Timestamp { get; set; } = string.Empty;
    }

    public class RatingsDto
    {
        public int Technical { get; set; }
        public int Communication { get; set; }
        public int ProblemSolving { get; set; }
        public int Overall { get; set; }
    }
}