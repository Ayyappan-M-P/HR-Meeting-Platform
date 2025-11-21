// Services/IJwtService.cs
namespace HRInterview.API.Services
{
    public interface IJwtService
    {
        string GenerateToken(int userId, string email, string role);
    }
}