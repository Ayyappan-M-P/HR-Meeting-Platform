// using MailKit.Net.Smtp;
// using MailKit.Security;
// using MimeKit;

// namespace HRInterview.API.Services
// {
//     public interface IEmailService
//     {
//         Task SendInterviewLinkAsync(string toEmail, string candidateName, string meetingLink, DateTime scheduledAt);
//     }

//     public class EmailService : IEmailService
//     {
//         private readonly IConfiguration _config;

//         public EmailService(IConfiguration config)
//         {
//             _config = config;
//         }

//         public async Task SendInterviewLinkAsync(string toEmail, string candidateName, string meetingLink, DateTime scheduledAt)
//         {
//             var message = new MimeMessage();
//             message.From.Add(new MailboxAddress("HR Interview System", _config["Email:From"]));
//             message.To.Add(new MailboxAddress(candidateName, toEmail));
//             message.Subject = "Interview Invitation - Meeting Link";

//             var bodyBuilder = new BodyBuilder
//             {
//                 HtmlBody = $@"
//                     <h2>Hello {candidateName},</h2>
//                     <p>You have been invited to an interview session.</p>
//                     <p><strong>Scheduled Time:</strong> {scheduledAt:MMMM dd, yyyy HH:mm} UTC</p>
//                     <p><strong>Meeting Link:</strong> <a href='{meetingLink}'>{meetingLink}</a></p>
//                     <p>Please join at the scheduled time.</p>
//                     <p>Best regards,<br/>HR Team</p>
//                 "
//             };

//             message.Body = bodyBuilder.ToMessageBody();

//             using var client = new SmtpClient();
//             await client.ConnectAsync(_config["Email:SmtpServer"], int.Parse(_config["Email:Port"]), SecureSocketOptions.StartTls);
//             await client.AuthenticateAsync(_config["Email:Username"], _config["Email:Password"]);
//             await client.SendAsync(message);
//             await client.DisconnectAsync(true);
//         }
//     }
// }

// Services/EmailService.cs - Updated
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace HRInterview.API.Services
{
    public interface IEmailService
    {
        Task SendInterviewLinkWithIdAsync(string toEmail, string candidateName, string meetingId, string meetingLink, DateTime scheduledAt);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendInterviewLinkWithIdAsync(string toEmail, string candidateName, string meetingId, string meetingLink, DateTime scheduledAt)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("HR Interview System", _config["Email:From"]));
            message.To.Add(new MailboxAddress(candidateName, toEmail));
            message.Subject = "Interview Invitation - Your Meeting Details";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                            .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                            .meeting-id {{ background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }}
                            .meeting-id h2 {{ color: #667eea; font-size: 32px; margin: 10px 0; letter-spacing: 2px; }}
                            .details {{ background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }}
                            .details p {{ margin: 10px 0; }}
                            .button {{ display: inline-block; background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }}
                            .instructions {{ background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3; margin: 20px 0; }}
                            .footer {{ text-align: center; color: #666; font-size: 12px; margin-top: 20px; }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <div class='header'>
                                <h1>🎯 Interview Invitation</h1>
                                <p>You've been invited to an interview session</p>
                            </div>
                            
                            <div class='content'>
                                <p>Hello <strong>{candidateName}</strong>,</p>
                                <p>You have been scheduled for an interview. Please use the details below to join at the scheduled time.</p>
                                
                                <div class='meeting-id'>
                                    <p style='margin: 0; color: #666; font-size: 14px;'>Your Meeting ID</p>
                                    <h2>{meetingId}</h2>
                                    <p style='margin: 0; color: #666; font-size: 12px;'>Keep this ID safe</p>
                                </div>
                                
                                <div class='details'>
                                    <p><strong>📧 Your Email:</strong> {toEmail}</p>
                                    <p><strong>📅 Scheduled Date:</strong> {scheduledAt:MMMM dd, yyyy}</p>
                                    <p><strong>🕐 Time:</strong> {scheduledAt:HH:mm} UTC</p>
                                    <p><strong>🆔 Meeting ID:</strong> {meetingId}</p>
                                </div>
                                
                                <div style='text-align: center;'>
                                    <a href='{meetingLink}' class='button'>Join Interview</a>
                                </div>
                                
                                <div class='instructions'>
                                    <h3 style='margin-top: 0;'>📋 How to Join:</h3>
                                    <ol>
                                        <li>Click the 'Join Interview' button above or visit the meeting link</li>
                                        <li>Enter your <strong>Email</strong>: {toEmail}</li>
                                        <li>Enter your <strong>Meeting ID</strong>: {meetingId}</li>
                                        <li>Click 'Join' to enter the interview room</li>
                                    </ol>
                                </div>
                                
                                <div style='background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;'>
                                    <h3 style='margin-top: 0;'>⚠️ Before the Interview:</h3>
                                    <ul>
                                        <li>Test your camera and microphone</li>
                                        <li>Find a quiet, well-lit location</li>
                                        <li>Ensure stable internet connection</li>
                                        <li>Join 5 minutes early</li>
                                    </ul>
                                </div>
                                
                                <p><strong>Direct Link:</strong><br/>
                                <a href='{meetingLink}' style='color: #667eea;'>{meetingLink}</a></p>
                                
                                <div class='footer'>
                                    <p>This is an automated email from the HR Interview System.</p>
                                    <p>If you have any questions, please contact the HR department.</p>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>
                "
            };

            // Also add plain text version
            bodyBuilder.TextBody = $@"
Interview Invitation

Hello {candidateName},

You have been scheduled for an interview.

Meeting Details:
- Meeting ID: {meetingId}
- Your Email: {toEmail}
- Scheduled: {scheduledAt:MMMM dd, yyyy HH:mm} UTC

How to Join:
1. Visit: {meetingLink}
2. Enter Email: {toEmail}
3. Enter Meeting ID: {meetingId}
4. Click 'Join'

Before the Interview:
- Test your camera and microphone
- Find a quiet, well-lit location
- Ensure stable internet connection
- Join 5 minutes early

Best regards,
HR Interview System
            ";

            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_config["Email:SmtpServer"], int.Parse(_config["Email:Port"]), SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_config["Email:Username"], _config["Email:Password"]);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}