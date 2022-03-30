using Prs_Api.Models.Dtos;
using System.Security.Claims;

namespace Prs_Api.Managers.Abstractions
{
    public interface IMovieRequestManager
    {
        public IList<MovieRequestModel> GetAll();
        public MovieRequestModel? GetById(int id);
        public IList<MovieRequestModel> GetByUserId(Guid userId);
        public MovieRequestModel AddMovieRequest(MovieRequestAddModel movieRequestPostModel, ClaimsPrincipal user);
        public DateTime? ApproveMovieRequest(int id);
    }
}
