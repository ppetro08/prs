using prs_api.Models.Dtos;
using System.Security.Claims;

namespace prs_api.Services.Abstractions
{
    public interface IMovieRequestService
    {
        public IList<MovieRequestModel> GetAll();
        public MovieRequestModel? GetById(int id);
        public IList<MovieRequestModel> GetByUserId(Guid userId);
        public MovieRequestModel AddMovieRequest(MovieRequestAddModel movieRequestPostModel, ClaimsPrincipal user);
        public DateTime? ApproveMovieRequest(int id);
    }
}
