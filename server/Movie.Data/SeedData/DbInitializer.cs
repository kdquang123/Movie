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
    }
}
