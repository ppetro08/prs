using prs_api.Models.Dtos;

namespace prs_api.Managers.Abstractions
{
    public interface IMovieRequestManager
    {
        public IList<MovieRequestModel> GetAll();
        public MovieRequestModel? GetById(int id);
        public IList<MovieRequestModel> GetByUserId(Guid userId);
    }
}
