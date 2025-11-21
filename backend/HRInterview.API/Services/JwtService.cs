// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using Microsoft.IdentityModel.Tokens;

// namespace HRInterview.API.Services
// {
//     public interface IJwtService
//     {
//         string GenerateToken(int userId, string email, string role);
//     }

//     public class JwtService : IJwtService
//     {
//         private readonly IConfiguration _config;

//         public JwtService(IConfiguration config)
//         {
//             _config = config;
//         }

//         public string GenerateToken(int userId, string email, string role)
//         {
//             var claims = new[]
//             {
//                 new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
//                 new Claim(ClaimTypes.Email, email),
//                 new Claim(ClaimTypes.Role, role)
//             };

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
//             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//             var token = new JwtSecurityToken(
//                 issuer: _config["Jwt:Issuer"],
//                 audience: _config["Jwt:Audience"],
//                 claims: claims,
//                 expires: DateTime.UtcNow.AddDays(7),
//                 signingCredentials: creds
//             );

//             return new JwtSecurityTokenHandler().WriteToken(token);
//         }
//     }
// }

// Services/JwtService.cs
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HRInterview.API.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(int userId, string email, string role)
        {
            var jwtKey = _configuration["Jwt:Key"] ?? "1c953af4ad9ce1659b29d3e41eca9f2f";
            var key = Encoding.ASCII.GetBytes(jwtKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            Console.WriteLine($"[JWT] Generated token for user {userId} ({email}) with role {role}");
            Console.WriteLine($"[JWT] Token: {tokenString.Substring(0, Math.Min(50, tokenString.Length))}...");

            return tokenString;
        }
    }
}