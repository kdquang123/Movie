using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Movie.Business.Mappings;
using Movie.Data;
using Movie.Data.UnitOfWorks;
using Movie.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

//Add DbContext
builder.Services.AddDbContext<MovieDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnetionString"));
});

// Register Identity: UserManager, RoleManager, SignInManager
builder.Services.AddIdentity<User, Role>(options =>
{
    options.SignIn.RequireConfirmedEmail = false;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 8;
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<MovieDbContext>()
    .AddDefaultTokenProviders();

//Register Service
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Register AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers();

app.UseHttpsRedirection();

app.Run();

