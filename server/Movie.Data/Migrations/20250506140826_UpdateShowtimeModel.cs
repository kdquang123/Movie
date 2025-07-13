using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Movie.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateShowtimeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Showtimes_Films_FilmId",
                table: "Showtimes");

            migrationBuilder.DropColumn(
                name: "MovieId",
                table: "Showtimes");

            migrationBuilder.AlterColumn<Guid>(
                name: "FilmId",
                table: "Showtimes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Showtimes_Films_FilmId",
                table: "Showtimes",
                column: "FilmId",
                principalTable: "Films",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Showtimes_Films_FilmId",
                table: "Showtimes");

            migrationBuilder.AlterColumn<Guid>(
                name: "FilmId",
                table: "Showtimes",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "MovieId",
                table: "Showtimes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_Showtimes_Films_FilmId",
                table: "Showtimes",
                column: "FilmId",
                principalTable: "Films",
                principalColumn: "Id");
        }
    }
}
