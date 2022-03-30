﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prs_Api.Managers.Abstractions;
using Prs_Api.Models.Dtos;

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
        public MovieRequestModel Post(MovieRequestAddModel movieRequestPostModel)
        {
            // TODO - Create some sort of session for ease of passing a user?
            var movie = _movieRequestManager.AddMovieRequest(movieRequestPostModel, User);
            return movie;
        }

        [HttpPost($"{{id}}/{nameof(ApproveMovieRequest)}")]
        public DateTime? ApproveMovieRequest(int id)
        {
            var approved = _movieRequestManager.ApproveMovieRequest(id);
            return approved;
        }
    }
}