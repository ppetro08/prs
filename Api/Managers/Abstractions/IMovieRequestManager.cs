using Prs_Api.Models.Dtos;
using Prs_Api.Models.Radarr;
using System.Security.Claims;

namespace Prs_Api.Managers.Abstractions
{
    public interface IMovieRequestManager
    {
        public IList<MovieRequestModel> GetAll();
        public MovieRequestModel? GetById(int id);
        public IList<MovieRequestModel> GetByUserId(Guid userId);
        public MovieRequestModel AddMovieRequest(MovieRequestModel movieRequestModel, ClaimsPrincipal user);
        public Task<MovieRequestModel?> ApproveMovieRequest(int id, int? qualityProfileId);
        public Task<RadarrMovieLookupModel?> AddMovie(int tmdbId, int? qualityProfileId);
    }
}
