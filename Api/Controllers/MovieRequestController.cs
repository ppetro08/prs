using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prs_Api.Managers.Abstractions;
using Prs_Api.Models.Dtos;
using Prs_Api.Models.Radarr;

namespace Prs_Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class MovieRequestController : ControllerBase
    {
        private readonly IMovieRequestManager _movieRequestManager;

        public MovieRequestController(IMovieRequestManager movieRequestManager)
        {
            _movieRequestManager = movieRequestManager;
        }

        [HttpGet]
        public IEnumerable<MovieRequestModel> Get()
        {
            var movies = _movieRequestManager.GetAll();
            return movies;
        }

        [HttpGet("{userId}")]
        public IEnumerable<MovieRequestModel> Get(Guid userId)
        {
            var movies = _movieRequestManager.GetByUserId(userId);
            return movies;
        }

        [HttpPost]
        public MovieRequestModel Post(MovieRequestModel movieRequestModel)
        {
            // TODO - Create some sort of session for ease of passing a user?
            var movie = _movieRequestManager.AddMovieRequest(movieRequestModel, User);
            return movie;
        }

        [HttpPost($"{{id}}/{nameof(ApproveMovieRequest)}")]
        public async Task<MovieRequestModel?> ApproveMovieRequest(int id, int? qualityProfileId = null)
        {
            var result = await _movieRequestManager.ApproveMovieRequest(id, qualityProfileId);

            return result;
        }

        [AllowAnonymous]
        [HttpPost(nameof(AddMovie))]
        public async Task<RadarrMovieLookupModel?> AddMovie(int tmdbId, int? qualityProfileId)
        {
            var result = await _movieRequestManager.AddMovie(tmdbId, qualityProfileId);

            return result;
        }
    }
}
