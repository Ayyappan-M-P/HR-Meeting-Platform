// // using Microsoft.EntityFrameworkCore;
// // using Microsoft.AspNetCore.Authentication.JwtBearer;
// // using Microsoft.IdentityModel.Tokens;
// // using System.Text;
// // using HRInterview.API.Data;
// // using HRInterview.API.Services;

// // var builder = WebApplication.CreateBuilder(args);

// // // Add services
// // builder.Services.AddDbContext<AppDbContext>(options =>
// //     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// // builder.Services.AddScoped<IEmailService, EmailService>();
// // builder.Services.AddScoped<IJwtService, JwtService>();

// // builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
// //     .AddJwtBearer(options =>
// //     {
// //         options.TokenValidationParameters = new TokenValidationParameters
// //         {
// //             ValidateIssuer = true,
// //             ValidateAudience = true,
// //             ValidateLifetime = true,
// //             ValidateIssuerSigningKey = true,
// //             ValidIssuer = builder.Configuration["Jwt:Issuer"],
// //             ValidAudience = builder.Configuration["Jwt:Audience"],
// //             IssuerSigningKey = new SymmetricSecurityKey(
// //                 Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
// //         };
// //     });

// // builder.Services.AddControllers();
// // builder.Services.AddCors(options =>
// // {
// //     options.AddPolicy("AllowAll", policy =>
// //     {
// //         policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
// //     });
// // });

// // var app = builder.Build();

// // app.UseCors("AllowAll");
// // app.UseAuthentication();
// // app.UseAuthorization();
// // app.MapControllers();

// // Console.WriteLine(BCrypt.Net.BCrypt.HashPassword("password123"));



// // app.Run();


// using Microsoft.EntityFrameworkCore;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.IdentityModel.Tokens;
// using System.Text;
// using HRInterview.API.Data;
// using HRInterview.API.Services;

// var builder = WebApplication.CreateBuilder(args);

// // Add services
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// builder.Services.AddScoped<IEmailService, EmailService>();
// builder.Services.AddScoped<IJwtService, JwtService>();

// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateLifetime = true,
//             ValidateIssuerSigningKey = true,
//             ValidIssuer = builder.Configuration["Jwt:Issuer"],
//             ValidAudience = builder.Configuration["Jwt:Audience"],
//             IssuerSigningKey = new SymmetricSecurityKey(
//                 Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
//         };
//     });

// builder.Services.AddControllers();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", policy =>
//     {
//         policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
//     });
// });

// var app = builder.Build();

// // Initialize HR users at startup
// try
// {
//     using var scope = app.Services.CreateScope();
//     var startupService = new StartupService(scope.ServiceProvider);
//     await startupService.EnsureHRUsersExist();
// }
// catch (Exception ex)
// {
//     Console.WriteLine($"[ERROR] Failed to initialize HR users: {ex.Message}");
// }

// app.UseCors("AllowAll");
// app.UseAuthentication();
// app.UseAuthorization();
// app.MapControllers();

// app.Run();

// Program.cs - Complete JWT Configuration
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using HRInterview.API.Data;
using HRInterview.API.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database Configuration
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Email Service
builder.Services.AddScoped<IEmailService, EmailService>();
// JWT Service
builder.Services.AddScoped<IJwtService, JwtService>();

// JWT Authentication Configuration
var jwtKey = builder.Configuration["Jwt:Key"] ?? "YourSuperSecretKeyThatIsAtLeast32CharactersLong!";
var key = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // Set to true in production
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };

    // Add logging for debugging
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            Console.WriteLine("Token validated successfully");
            return Task.CompletedTask;
        },
        OnMessageReceived = context =>
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (!string.IsNullOrEmpty(token))
            {
                Console.WriteLine($"Token received: {token.Substring(0, Math.Min(20, token.Length))}...");
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();