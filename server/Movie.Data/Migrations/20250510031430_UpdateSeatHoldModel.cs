using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Movie.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeatHoldModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SeatHolds_Bookings_BookingId",
                table: "SeatHolds");

            migrationBuilder.DropIndex(
                name: "IX_SeatHolds_BookingId",
                table: "SeatHolds");

            migrationBuilder.DropColumn(
                name: "BookingId",
                table: "SeatHolds");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "SeatHolds");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpireAt",
                table: "SeatHolds",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpireAt",
                table: "SeatHolds");

            migrationBuilder.AddColumn<Guid>(
                name: "BookingId",
                table: "SeatHolds",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "SeatHolds",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SeatHolds_BookingId",
                table: "SeatHolds",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_SeatHolds_Bookings_BookingId",
                table: "SeatHolds",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id");
        }
    }
}
