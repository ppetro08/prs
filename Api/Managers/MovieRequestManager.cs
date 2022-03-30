using Prs_Api.Managers.Abstractions;
using Prs_Api.Models.Dtos;
using Prs_Api.Services.Abstractions;
using System.Security.Claims;

namespace Prs_Api.Managers
{
    public class MovieRequestManager : IMovieRequestManager
    {
        private readonly IMovieRequestService _movieRequestService;

        public MovieRequestManager(IMovieRequestService movieRequestService)
        {
            _movieRequestService = movieRequestService;
        }

        public IList<MovieRequestModel> GetAll()
        {
            var movies = _movieRequestService.GetAll();
            return movies;
        }

        public MovieRequestModel? GetById(int id)
        {
            var movie = _movieRequestService.GetById(id);
            return movie;
        }

        public IList<MovieRequestModel> GetByUserId(Guid userId)
        {
            var movies = _movieRequestService.GetByUserId(userId);
            return movies;
        }

        public MovieRequestModel AddMovieRequest(MovieRequestAddModel movieRequestPostModel, ClaimsPrincipal user)
        {
            var movie = _movieRequestService.AddMovieRequest(movieRequestPostModel, user);
            return movie;
        }

        public DateTime? ApproveMovieRequest(int id)
        {
            var result = _movieRequestService.ApproveMovieRequest(id);
            return result;
        }
    }
}
