using Prs_Api.Core.Exceptions;
using Prs_Api.Data.Services.Abstractions;
using Prs_Api.Managers.Abstractions;
using Prs_Api.Models.Configuration;
using Prs_Api.Models.Dtos;
using Prs_Api.Models.Radarr;
using Prs_Api.Services.Abstractions;
using System.Security.Claims;

namespace Prs_Api.Managers
{
    public class MovieRequestManager : IMovieRequestManager
    {
        private readonly IMovieRequestService _movieRequestService;
        private readonly IRadarrService _radarrService;

        public MovieRequestManager(IMovieRequestService movieRequestService, IRadarrService radarrService)
        {
            _movieRequestService = movieRequestService;
            _radarrService = radarrService;
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

        public MovieRequestModel AddMovieRequest(MovieRequestModel movieRequestModel, ClaimsPrincipal user)
        {
            var movie = _movieRequestService.AddMovieRequest(movieRequestModel, user);
            return movie;
        }

        public async Task<MovieRequestModel?> ApproveMovieRequest(int id)
        {
            var result = ApproveMovieRequest(id, null);
            return await result;
        }

        public async Task<MovieRequestModel?> ApproveMovieRequest(int id, int? qualityProfileId)
        {
            var result = _movieRequestService.ApproveMovieRequest(id, qualityProfileId);
            if (result == null)
            {
                throw new AppException("No request found.");
            }

            var radarrResult = await AddMovie(result.MovieDbid, qualityProfileId);
            // TODO - If this happens, the movie request should not be approved
            if (radarrResult == null)
            {
                throw new AppException("Movie not added.");
            }
            return result;
        }

        public async Task<RadarrMovieLookupModel?> AddMovie(int tmdbId, int? qualityProfileId = null)
        {
            var radarrMovieLookupModel = await _radarrService.GetMovie(tmdbId);
            if (radarrMovieLookupModel == null)
            {
                throw new AppException($"Could not find movie for tmdbId: {tmdbId}");
            }

            radarrMovieLookupModel.AddOptions = new RadarrAddMovieOptions { SearchForMovie = true };
            radarrMovieLookupModel.Monitored = true;
            radarrMovieLookupModel.RootFolderPath = "E:\\Movies"; // TODO - Store RootFolderPath
            radarrMovieLookupModel.QualityProfileId = qualityProfileId ?? 6;

            var result = await _radarrService.AddMovie(radarrMovieLookupModel);
            return result;
        }
    }
}
