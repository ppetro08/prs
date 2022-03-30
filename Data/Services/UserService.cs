using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Prs_Api.Core.Exceptions;
using Prs_Api.Data;
using Prs_Api.Models;
using Prs_Api.Models.Authentication;
using Prs_Api.Models.Configuration;
using Prs_Api.Services.Abstractions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Prs_Api.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IAppDbContext _appDbContext;

        private const string UserNameOrPasswordIncorrectError = "Username or password is incorrect.";

        public UserService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IMapper mapper,
            IAppDbContext appDbContext
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        public async Task<bool> ConfirmRegistration(ConfirmRegistrationRequestModel data)
        {
            var user = await _userManager.FindByIdAsync(data.UserId);
            if (user == null)
            {
                throw new KeyNotFoundException("User with email could not be found.");
            }

            var identityResult = await _userManager.ConfirmEmailAsync(user, data.Token);
            if (identityResult == null)
            {
                throw new AppException("Registration could not be confirmed");
            }
            if (identityResult.Succeeded)
            {
                return true;
            }

            throw new AppException("Registration could not be confirmed");
        }

        public async Task<LoginResponseModel> Login(LoginRequestModel data)
        {
            var user = await GetUserByEmail(data.Email);
            if (user == null)
            {
                throw new AppException(UserNameOrPasswordIncorrectError);
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, data.Password, data.RememberMe, false);
            if (signInResult.Succeeded)
            {
                var loginResponse = _mapper.Map<LoginResponseModel>(user);
                loginResponse.Token = generateJwtToken(user.Id);

                return loginResponse;
            }

            throw new AppException(UserNameOrPasswordIncorrectError);
        }

        public async Task<RegisterResponseModel> Register(RegisterRequestModel data)
        {
            var user = _mapper.Map<User>(data);
            var result = await _userManager.CreateAsync(user, data.Password);

            if (result.Succeeded)
            {
                var createdUser = await _userManager.FindByEmailAsync(data.Email);
                if (createdUser == null)
                {
                    throw new AppException("User was not created properly");
                }

                var emailConfirmationtoken = await _userManager.GenerateEmailConfirmationTokenAsync(createdUser);
                return new RegisterResponseModel
                {
                    Email = createdUser.Email,
                    Token = emailConfirmationtoken
                };
            }

            throw new Exception("User was not created properly");
        }

        public Task<List<User>> GetUsers()
        {
            return _appDbContext.AppUsers
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .AsNoTracking()
                .ToListAsync();
        }

        public Task<User?> GetUserByEmail(string email)
        {
            return _appDbContext.AppUsers
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .AsNoTracking()
                .SingleOrDefaultAsync(u => u.Email == email);
        }

        private string generateJwtToken(Guid userId)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtSettings = _configuration.GetSection("Jwt").Get<JwtSettings>();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Key);
            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>
            {
                // TODO - Set the roles for real here
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            };
            var claimsIdentity = new ClaimsIdentity(claims);
            var jwtToken = tokenHandler.CreateJwtSecurityToken(
                jwtSettings.Issuer, 
                jwtSettings.Audience, 
                claimsIdentity, 
                null, 
                DateTime.UtcNow.AddDays(7), 
                null, 
                signingCredentials);
            return tokenHandler.WriteToken(jwtToken);
        }
    }
}
