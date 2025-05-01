using System;
using Microsoft.AspNetCore.Identity;
using Movie.Models;

namespace Movie.Data.SeedData;

public class DbInitializer
{
    private static readonly string[] Roles = new[] { "ADMIN", "EMPLOYEE", "USER" };

    public static async Task Seed(MovieDbContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        if (!context.Roles.Any())
        {
            foreach (var role in Roles)
            {
                await roleManager.CreateAsync(new Role { Name = role });
                await context.SaveChangesAsync();
            }
        }

        if (!context.Categories.Any())
        {
            await context.Categories.AddRangeAsync(new List<Category>(){
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000001"),
                    Name = "Hành động",
                    Description = "Phim có nhiều cảnh đánh đấm, truy đuổi, chiến đấu",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000002"),
                    Name = "Hài",
                    Description = "Phim mang yếu tố giải trí, gây cười",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000003"),
                    Name = "Tình cảm",
                    Description = "Phim về chủ đề tình yêu, gia đình, cảm xúc",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000004"),
                    Name = "Kinh dị",
                    Description = "Phim có yếu tố ma quái, hù dọa, hồi hộp",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000005"),
                    Name = "Tâm lý",
                    Description = "Phim khai thác chiều sâu tâm lý nhân vật",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000006"),
                    Name = "Phiêu lưu",
                    Description = "Phim với những chuyến đi, khám phá địa điểm mới",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000007"),
                    Name = "Viễn tưởng",
                    Description = "Phim khoa học, công nghệ, thế giới tương lai",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000008"),
                    Name = "Hoạt hình",
                    Description = "Phim hoạt hình dành cho trẻ em hoặc cả gia đình",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000009"),
                    Name = "Chiến tranh",
                    Description = "Phim tái hiện bối cảnh chiến tranh, lịch sử",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000010"),
                    Name = "Tài liệu",
                    Description = "Phim ghi lại các sự kiện, nhân vật có thật",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000011"),
                    Name = "Ca nhạc",
                    Description = "Phim có yếu tố âm nhạc, nhảy múa nổi bật",
                    CreatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000012"),
                    Name = "Thể thao",
                    Description = "Phim nói về các vận động viên, thi đấu thể thao",
                    CreatedAt = DateTime.UtcNow
                }
            });
            await context.SaveChangesAsync();
        }

        if (!context.AgeRestrictions.Any())
        {
            await context.AgeRestrictions.AddRangeAsync(new List<AgeRestriction>
            {
                new AgeRestriction
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000001"),
                    Code = "P",
                    Description = "Phim dành cho mọi đối tượng",
                    MinAge = null,
                    CreatedAt = DateTime.UtcNow
                },
                new AgeRestriction
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000002"),
                    Code = "K",
                    Description = "Phim dành cho trẻ em dưới 13 tuổi có người lớn đi kèm",
                    MinAge = null,
                    CreatedAt = DateTime.UtcNow
                },
                new AgeRestriction
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000003"),
                    Code = "T13",
                    Description = "Phim cấm trẻ em dưới 13 tuổi",
                    MinAge = 13,
                    CreatedAt = DateTime.UtcNow
                },
                new AgeRestriction
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000004"),
                    Code = "T16",
                    Description = "Phim cấm người dưới 16 tuổi",
                    MinAge = 16,
                    CreatedAt = DateTime.UtcNow
                },
                new AgeRestriction
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000005"),
                    Code = "T18",
                    Description = "Phim cấm người dưới 18 tuổi",
                    MinAge = 18,
                    CreatedAt = DateTime.UtcNow
                },
                new AgeRestriction
                {
                    Id = new Guid("00000000-0000-0000-0000-000000000006"),
                    Code = "C",
                    Description = "Phim bị cấm phổ biến (chỉ dùng nội bộ hoặc nghiên cứu)",
                    MinAge = null,
                    CreatedAt = DateTime.UtcNow
                }
            });

            await context.SaveChangesAsync();
        }
    }
}
