using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Movie.API.Hubs;
using Movie.API.Middleware;
using Movie.Business.Handler;
using Movie.Business.Mappings;
using Movie.Business.Services;
using Movie.Data;
using Movie.Data.SeedData;
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
    options.Password.RequiredLength = 6;
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<MovieDbContext>()
    .AddDefaultTokenProviders();

//Register IHttpContextAccessor
builder.Services.AddHttpContextAccessor();

//Register Service
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IVNPayService, VNPayService>();
builder.Services.AddScoped<IMomoService, MomoService>();
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddHostedService<SeatHoldAndBookingCleanUpService>();

// Register AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

//Register MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(RegisterRequestCommand).Assembly));

// Register JWT with Bearer token
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration["JWT:Secret"] ?? throw new InvalidOperationException("JWT:Secret is not configured.")))
    };

    // options.Events = new JwtBearerEvents
    // {
    //     OnAuthenticationFailed = context =>
    //     {
    //         if (context.Exception is SecurityTokenExpiredException)
    //         {
    //             // Dừng pipeline xử lý mặc định của JWT Bearer
    //             context.NoResult();

    //             if (!context.Response.HasStarted)
    //             {
    //                 context.Response.StatusCode = StatusCodes.Status401Unauthorized;
    //                 context.Response.ContentType = "application/json";

    //                 var result = JsonSerializer.Serialize(new
    //                 {
    //                     error = "invalid_token",
    //                     error_description = "The token has expired"
    //                 });

    //                 return context.Response.WriteAsync(result);
    //             }

    //             // Nếu response đã bắt đầu, không làm gì cả
    //         }

    //         return Task.CompletedTask;
    //     }
    // };
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", opt => opt
      .WithOrigins(builder.Configuration.GetSection("CORs:AllowedOrigins").Get<string[]>() ?? [])
      .AllowAnyHeader()
      .WithMethods(builder.Configuration.GetSection("CORs:AllowedMethods").Get<string[]>() ?? [])
        .WithExposedHeaders("Www-Authenticate")
      .AllowCredentials());

    options.AddPolicy("AllowAnyOrigin", opt => opt
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

// Add SignalR
builder.Services.AddSignalR();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();

    // Seed data
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<MovieDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
    await DbInitializer.Seed(context, userManager, roleManager);
}
app.UseRouting();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHub<SeatHub>("/seathub");

app.Run();

