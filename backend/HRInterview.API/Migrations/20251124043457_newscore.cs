using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRInterview.API.Migrations
{
    /// <inheritdoc />
    public partial class newscore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Scorecards",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "Scorecards",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Scorecards");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "Scorecards");
        }
    }
}
