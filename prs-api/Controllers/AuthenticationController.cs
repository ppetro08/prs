﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using prs_api.Data;
using prs_api.Models.Authentication;
using prs_api.Services.Abstractions;

namespace prs_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public AuthenticationController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IUserService userService
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost(nameof(ConfirmRegistration))]
        public async Task<IActionResult> ConfirmRegistration([FromBody] ConfirmRegistrationRequestModel data)
        {
            var confirmRegistrationReponse = await _userService.ConfirmRegistration(data);
            return Ok(confirmRegistrationReponse);
        }

        [AllowAnonymous]
        [HttpPost(nameof(Login))]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel data)
        {
            var loginResponse = await _userService.Login(data);
            return Ok(loginResponse);
        }

        [AllowAnonymous]
        [HttpPost(nameof(Register))]
        public async Task<IActionResult> Register([FromBody] RegisterRequestModel data)
        {
            var registerResponse = await _userService.Register(data);
            return Ok(registerResponse);
        }
    }
}
