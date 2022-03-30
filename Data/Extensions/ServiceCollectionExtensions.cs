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
            // TODO - What is this for?
            services.AddTransient<HttpMessageHandler, HttpClientHandler>();
            services.AddHttpClient<IRadarrService, RadarrService>(c =>
            {
                var apis = appSettings.Apis;
                if (apis != null && apis.Radarr != null)
                {
                    var endpointSettings = apis.Radarr;
                    c.BaseAddress = new Uri(endpointSettings.Url);
                    c.DefaultRequestHeaders.Add("API-Token", apis.Radarr.Key);
                }
            });

            return services;
        }
    }
}
