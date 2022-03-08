using prs_api.Models.Dtos;

namespace prs_api.Services.Abstractions
{
    public interface IMovieRequestService
    {
        public IList<MovieRequestModel> GetAll();
        public MovieRequestModel? GetById(int id);
        public IList<MovieRequestModel> GetByUserId(Guid userId);
    }
}
