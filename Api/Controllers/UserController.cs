using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prs_Api.Models;
using Prs_Api.Services.Abstractions;

namespace Prs_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            // TODO - Need auth handler for errors
            return await _userService.GetUsers();
        }

        //[Authorize(Roles = "Admin")]
        //[HttpPost]
        //public async Task<IEnumerable<User>> UpdateUsers(List<User>)
        //{
        //    // TODO - Need auth handler for errors
        //    return await _userService.GetUsers();
        //}
    }
}
