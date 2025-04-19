
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions{

    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        services.AddSwaggerGen(
        //     c =>
        // {
        //     c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
        //     {
        //         Name = "Authorization",
        //         Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        //         Scheme = "Bearer",
        //         BearerFormat = "JWT",
        //         In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        //         Description = "Enter 'Bearer' [space] and your token"
        //     });
        //     c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
        //     {
        //         {
        //             new Microsoft.OpenApi.Models.OpenApiSecurityScheme
        //             {
        //                 Reference = new Microsoft.OpenApi.Models.OpenApiReference
        //                 {
        //                     Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
        //                     Id = "Bearer"
        //                 }
        //             },
        //             new string[] {}
        //         }
        //     });
        // }
        );

        services.AddOpenApi();
        services.AddDbContext<DataContext>(options =>
        options.UseSqlite(config.GetConnectionString("DefaultConnection"))
        );
        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IPhotoService, PhotoService>();
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

        return services;
    }
}