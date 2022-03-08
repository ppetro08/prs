using AutoMapper;
using Microsoft.EntityFrameworkCore;
using prs_api.Data;
using prs_api.Models.Dtos;
using prs_api.Services.Abstractions;

namespace prs_api.Services
{
    public class MovieRequestService : IMovieRequestService
    {
        private readonly IAppDbContext _appDbContext;
        private readonly IMapper _mapper;

        public MovieRequestService(IAppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
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
    }
}
