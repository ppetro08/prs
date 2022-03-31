using Newtonsoft.Json;
using Prs_Api.Data.Services.Abstractions;
using Prs_Api.Models.Radarr;
using System.Text;

namespace Prs_Api.Data.Services
{
    public class RadarrService: IRadarrService
    {
        private readonly HttpClient _httpClient;

        public RadarrService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<RadarrMovieLookupModel?> AddMovie(RadarrMovieLookupModel radarrMovieLookupModel)
        {
            var httpContent = new StringContent(JsonConvert.SerializeObject(radarrMovieLookupModel), Encoding.UTF8, "application/json");
            var result = await this._httpClient.PostAsync($"movie", httpContent);

            return JsonConvert.DeserializeObject<RadarrMovieLookupModel>(await result.Content.ReadAsStringAsync());
        }

        public async Task<RadarrMovieLookupModel?> GetMovie(int tmdbId)
        {
            var result = await this._httpClient.GetAsync($"movie/lookup/tmdb?tmdbId={tmdbId}");
            var radarrMovieLookupModel = JsonConvert.DeserializeObject<RadarrMovieLookupModel>(await result.Content.ReadAsStringAsync());
            return radarrMovieLookupModel;
        }
    }
}
