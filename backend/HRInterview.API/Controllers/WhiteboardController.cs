// Controllers/WhiteboardController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRInterview.API.Data;
using HRInterview.API.Models;

namespace HRInterview.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WhiteboardController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public WhiteboardController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveWhiteboard([FromBody] SaveWhiteboardDto dto)
        {
            try
            {
                // Decode base64 image
                var imageData = Convert.FromBase64String(dto.ImageData.Split(',')[1]);
                
                // Generate unique filename
                var fileName = $"whiteboard_{dto.InterviewId}_{DateTime.UtcNow.Ticks}.png";
                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "whiteboards");
                
                // Create directory if it doesn't exist
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var filePath = Path.Combine(uploadsFolder, fileName);
                
                // Save file
                await System.IO.File.WriteAllBytesAsync(filePath, imageData);

                // Save to database
                var whiteboard = new Whiteboard
                {
                    InterviewId = dto.InterviewId,
                    ImageUrl = $"/uploads/whiteboards/{fileName}"
                };

                _context.Whiteboards.Add(whiteboard);
                await _context.SaveChangesAsync();

                return Ok(new 
                { 
                    message = "Whiteboard saved successfully",
                    imageUrl = whiteboard.ImageUrl
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to save whiteboard", error = ex.Message });
            }
        }

        [HttpGet("interview/{interviewId}")]
        public async Task<IActionResult> GetWhiteboards(int interviewId)
        {
            var whiteboards = await _context.Whiteboards
                .Where(w => w.InterviewId == interviewId)
                .OrderByDescending(w => w.CreatedAt)
                .ToListAsync();

            return Ok(whiteboards);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWhiteboard(int id)
        {
            var whiteboard = await _context.Whiteboards.FindAsync(id);
            
            if (whiteboard == null)
                return NotFound();

            // Delete physical file
            var filePath = Path.Combine(_environment.WebRootPath, whiteboard.ImageUrl.TrimStart('/'));
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            _context.Whiteboards.Remove(whiteboard);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Whiteboard deleted successfully" });
        }
    }

    public class SaveWhiteboardDto
    {
        public int InterviewId { get; set; }
        public string ImageData { get; set; } = string.Empty;
    }
}