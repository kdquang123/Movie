using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Movie.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddFilmCategoryJoinEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Film_Categories_CategoryId",
                table: "Film");

            migrationBuilder.DropIndex(
                name: "IX_Film_CategoryId",
                table: "Film");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Film");

            migrationBuilder.CreateTable(
                name: "FilmCategories",
                columns: table => new
                {
                    FilmId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmCategories", x => new { x.FilmId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_FilmCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FilmCategories_Film_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Film",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FilmCategories_CategoryId",
                table: "FilmCategories",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilmCategories");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Film",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Film_CategoryId",
                table: "Film",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Film_Categories_CategoryId",
                table: "Film",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
