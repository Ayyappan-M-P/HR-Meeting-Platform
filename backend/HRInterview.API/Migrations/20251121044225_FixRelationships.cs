using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRInterview.API.Migrations
{
    /// <inheritdoc />
    public partial class FixRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InterviewLogs_Interviews_InterviewId1",
                table: "InterviewLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Scorecards_Interviews_InterviewId1",
                table: "Scorecards");

            migrationBuilder.DropForeignKey(
                name: "FK_Whiteboards_Interviews_InterviewId1",
                table: "Whiteboards");

            migrationBuilder.DropIndex(
                name: "IX_Whiteboards_InterviewId1",
                table: "Whiteboards");

            migrationBuilder.DropIndex(
                name: "IX_Scorecards_InterviewId1",
                table: "Scorecards");

            migrationBuilder.DropIndex(
                name: "IX_InterviewLogs_InterviewId1",
                table: "InterviewLogs");

            migrationBuilder.DropColumn(
                name: "InterviewId1",
                table: "Whiteboards");

            migrationBuilder.DropColumn(
                name: "InterviewId1",
                table: "Scorecards");

            migrationBuilder.DropColumn(
                name: "InterviewId1",
                table: "InterviewLogs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InterviewId1",
                table: "Whiteboards",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InterviewId1",
                table: "Scorecards",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InterviewId1",
                table: "InterviewLogs",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Whiteboards_InterviewId1",
                table: "Whiteboards",
                column: "InterviewId1");

            migrationBuilder.CreateIndex(
                name: "IX_Scorecards_InterviewId1",
                table: "Scorecards",
                column: "InterviewId1");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewLogs_InterviewId1",
                table: "InterviewLogs",
                column: "InterviewId1");

            migrationBuilder.AddForeignKey(
                name: "FK_InterviewLogs_Interviews_InterviewId1",
                table: "InterviewLogs",
                column: "InterviewId1",
                principalTable: "Interviews",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Scorecards_Interviews_InterviewId1",
                table: "Scorecards",
                column: "InterviewId1",
                principalTable: "Interviews",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Whiteboards_Interviews_InterviewId1",
                table: "Whiteboards",
                column: "InterviewId1",
                principalTable: "Interviews",
                principalColumn: "Id");
        }
    }
}
