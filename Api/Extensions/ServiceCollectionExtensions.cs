using Prs_Api.Data;
using Prs_Api.Data.Services;
using Prs_Api.Data.Services.Abstractions;
using Prs_Api.Managers;
using Prs_Api.Managers.Abstractions;
using Prs_Api.Services;
using Prs_Api.Services.Abstractions;

namespace Prs_Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddManagersAndServices(this IServiceCollection services)
        {
            return services.AddScoped<IAppDbContext, AppDbContext>()
            .AddScoped<IUserService, UserService>()
            .AddScoped<IMovieRequestManager, MovieRequestManager>()
            .AddScoped<IMovieRequestService, MovieRequestService>()
            .AddScoped<IRadarrService, RadarrService>();
        }
    }
}
