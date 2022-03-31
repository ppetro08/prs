using Prs_Api.Models.Radarr;

namespace Prs_Api.Data.Services.Abstractions
{
    public interface IRadarrService
    {
        public Task<RadarrMovieLookupModel?> AddMovie(RadarrMovieLookupModel radarrMovieLookupModel);

        public Task<RadarrMovieLookupModel?> GetMovie(int tmdbId);
    }
}
