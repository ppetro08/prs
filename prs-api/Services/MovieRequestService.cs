using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using prs_api.Data;
using prs_api.Models.Dtos;
using prs_api.Services.Abstractions;
using System.Security.Claims;

namespace prs_api.Services
{
    public class MovieRequestService : IMovieRequestService
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public MovieRequestService(AppDbContext appDbContext, IMapper mapper, UserManager<User> userManager)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _userManager = userManager;
        }

        public IList<MovieRequestModel> GetAll()
        {
            var movies = _appDbContext.MovieRequests.Include(mr => mr.User)
                .Select(m => _mapper.Map<MovieRequestModel>(m)).ToList();
            return movies;
        }

        public MovieRequestModel? GetById(int id)
        {
            var movie = _appDbContext.MovieRequests.SingleOrDefault(mr => mr.Id == id);
            return movie == null ? null : _mapper.Map<MovieRequestModel>(movie);
        }

        public IList<MovieRequestModel> GetByUserId(Guid userId)
        {
            var movies = _appDbContext.MovieRequests.Where(mr => mr.UserId == userId).Select(m => _mapper.Map<MovieRequestModel>(m)).ToList();
            return movies;
        }

        public MovieRequestModel AddMovieRequest(MovieRequestAddModel movieRequestPostModel, ClaimsPrincipal user)
        {
            var movieRequest = _mapper.Map<MovieRequest>(movieRequestPostModel);
            movieRequest.CreateDate = DateTime.UtcNow;
            
            var userId = _userManager.GetUserId(user);
            movieRequest.UserId = new Guid(userId);
            
            _appDbContext.MovieRequests.Add(movieRequest);
            _appDbContext.SaveChanges();

            var savedMovie = _appDbContext.MovieRequests.OrderByDescending(mr => mr.Id).First();
            return _mapper.Map<MovieRequestModel>(savedMovie);
        }

        public DateTime? ApproveMovieRequest(int id)
        {
            var movie = _appDbContext.MovieRequests.SingleOrDefault(mr => mr.Id == id);
            if(movie == null)
            {
                return null;
            }
            movie.ApproveDate = DateTime.UtcNow;

            _appDbContext.MovieRequests.Update(movie);
            _appDbContext.SaveChanges();

            return movie.ApproveDate;
        }
    }
}
