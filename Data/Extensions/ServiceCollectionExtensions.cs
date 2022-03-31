using Microsoft.Extensions.DependencyInjection;
using Prs_Api.Data.Services;
using Prs_Api.Data.Services.Abstractions;
using Prs_Api.Models.Configuration;

namespace Lkq.Data.SelfServe.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddHttpClients(this IServiceCollection services, AppSettings appSettings)
        {
            services.AddTransient<HttpMessageHandler, HttpClientHandler>();
            services.AddHttpClient<IRadarrService, RadarrService>(c =>
            {
                if (appSettings.Apis?.Radarr != null)
                {
                    c.BaseAddress = new Uri(appSettings.Apis.Radarr.Url);
                    c.DefaultRequestHeaders.Add("X-Api-Key", appSettings.Apis.Radarr.Key);
                }
            });

            return services;
        }
    }
}
