using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HRInterview.API.Migrations
{
    /// <inheritdoc />
    public partial class Fixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Candidates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ResumeUrl = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: true),
                    Role = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Interviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HRId = table.Column<int>(type: "integer", nullable: false),
                    CandidateEmail = table.Column<string>(type: "text", nullable: false),
                    MeetingLink = table.Column<string>(type: "text", nullable: false),
                    ScheduledAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Interviews_Users_HRId",
                        column: x => x.HRId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InterviewLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InterviewId = table.Column<int>(type: "integer", nullable: false),
                    LogType = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    InterviewId1 = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterviewLogs_Interviews_InterviewId",
                        column: x => x.InterviewId,
                        principalTable: "Interviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InterviewLogs_Interviews_InterviewId1",
                        column: x => x.InterviewId1,
                        principalTable: "Interviews",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Scorecards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InterviewId = table.Column<int>(type: "integer", nullable: false),
                    Communication = table.Column<int>(type: "integer", nullable: false),
                    Technical = table.Column<int>(type: "integer", nullable: false),
                    Coding = table.Column<int>(type: "integer", nullable: false),
                    Attitude = table.Column<int>(type: "integer", nullable: false),
                    FinalDecision = table.Column<string>(type: "text", nullable: false),
                    Comments = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    InterviewId1 = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scorecards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Scorecards_Interviews_InterviewId",
                        column: x => x.InterviewId,
                        principalTable: "Interviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Scorecards_Interviews_InterviewId1",
                        column: x => x.InterviewId1,
                        principalTable: "Interviews",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Whiteboards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InterviewId = table.Column<int>(type: "integer", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    InterviewId1 = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Whiteboards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Whiteboards_Interviews_InterviewId",
                        column: x => x.InterviewId,
                        principalTable: "Interviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Whiteboards_Interviews_InterviewId1",
                        column: x => x.InterviewId1,
                        principalTable: "Interviews",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_Email",
                table: "Candidates",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InterviewLogs_InterviewId",
                table: "InterviewLogs",
                column: "InterviewId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewLogs_InterviewId1",
                table: "InterviewLogs",
                column: "InterviewId1");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewLogs_Timestamp",
                table: "InterviewLogs",
                column: "Timestamp");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_CandidateEmail",
                table: "Interviews",
                column: "CandidateEmail");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_HRId",
                table: "Interviews",
                column: "HRId");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_MeetingLink",
                table: "Interviews",
                column: "MeetingLink",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Scorecards_InterviewId",
                table: "Scorecards",
                column: "InterviewId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Scorecards_InterviewId1",
                table: "Scorecards",
                column: "InterviewId1");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Whiteboards_InterviewId",
                table: "Whiteboards",
                column: "InterviewId");

            migrationBuilder.CreateIndex(
                name: "IX_Whiteboards_InterviewId1",
                table: "Whiteboards",
                column: "InterviewId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Candidates");

            migrationBuilder.DropTable(
                name: "InterviewLogs");

            migrationBuilder.DropTable(
                name: "Scorecards");

            migrationBuilder.DropTable(
                name: "Whiteboards");

            migrationBuilder.DropTable(
                name: "Interviews");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
