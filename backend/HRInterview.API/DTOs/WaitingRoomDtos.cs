// DTOs/WaitingRoomDtos.cs - ADD TO YOUR DTOs FOLDER
namespace HRInterview.API.DTOs
{
    public class JoinWaitingRoomDto
    {
        public int InterviewId { get; set; }
        public string CandidateEmail { get; set; } = string.Empty;
        public string CandidateName { get; set; } = string.Empty;
    }

    public class HRJoinMeetingDto
    {
        public int InterviewId { get; set; }
    }

    public class AdmitCandidateDto
    {
        public int InterviewId { get; set; }
        public string CandidateEmail { get; set; } = string.Empty;
    }

    public class WaitingCandidateDto
    {
        public int InterviewId { get; set; }
        public string CandidateEmail { get; set; } = string.Empty;
        public string CandidateName { get; set; } = string.Empty;
        public DateTime JoinedAt { get; set; }
        public int WaitingMinutes { get; set; }
    }

    public class CandidateStatusDto
    {
        public bool IsAdmitted { get; set; }
        public bool IsHRInMeeting { get; set; }
    }

    public class LeaveWaitingRoomDto
    {
        public int InterviewId { get; set; }
        public string CandidateEmail { get; set; } = string.Empty;
    }
}