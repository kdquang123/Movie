using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Movie.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMovieIMDbScoreDataType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Films_FilmId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_FilmId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "FilmId",
                table: "Categories");

            migrationBuilder.AlterColumn<decimal>(
                name: "IMDbScore",
                table: "Films",
                type: "decimal(3,1)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "IMDbScore",
                table: "Films",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(3,1)");

            migrationBuilder.AddColumn<Guid>(
                name: "FilmId",
                table: "Categories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_FilmId",
                table: "Categories",
                column: "FilmId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Films_FilmId",
                table: "Categories",
                column: "FilmId",
                principalTable: "Films",
                principalColumn: "Id");
        }
    }
}
