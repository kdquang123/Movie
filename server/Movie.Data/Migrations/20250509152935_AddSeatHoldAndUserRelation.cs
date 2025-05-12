using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Movie.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSeatHoldAndUserRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "SeatHolds",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_SeatHolds_UserId",
                table: "SeatHolds",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SeatHolds_Users_UserId",
                table: "SeatHolds",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SeatHolds_Users_UserId",
                table: "SeatHolds");

            migrationBuilder.DropIndex(
                name: "IX_SeatHolds_UserId",
                table: "SeatHolds");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SeatHolds");
        }
    }
}
