
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions{

    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        services.AddSwaggerGen();
        services.AddOpenApi();
        services.AddDbContext<DataContext>(options =>
        options.UseSqlite(config.GetConnectionString("DefaultConnection"))
        );
        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }
}