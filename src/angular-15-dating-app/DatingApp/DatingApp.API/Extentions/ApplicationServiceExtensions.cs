using DatingApp.API.Interfaces;
using DatingApp.API.Services;

namespace DatingApp.API.Extentions;
public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
    {
        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}
