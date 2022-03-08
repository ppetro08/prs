using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using prs_api.Managers.Abstractions;
using prs_api.Models.Dtos;

namespace prs_api.Controllers
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
    }
}
