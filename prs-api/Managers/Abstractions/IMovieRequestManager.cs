using prs_api.Models.Dtos;
using System.Security.Claims;

namespace prs_api.Managers.Abstractions
{
    public interface IMovieRequestManager
    {
        public IList<MovieRequestModel> GetAll();
        public MovieRequestModel? GetById(int id);
        public IList<MovieRequestModel> GetByUserId(Guid userId);
        public MovieRequestModel AddMovieRequest(MovieRequestAddModel movieRequestPostModel, ClaimsPrincipal user);
        public bool ApproveMovieRequest(int id);
    }
}
