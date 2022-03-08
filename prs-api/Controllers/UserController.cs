using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using prs_api.Data;
using prs_api.Services.Abstractions;

namespace prs_api.Controllers
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
