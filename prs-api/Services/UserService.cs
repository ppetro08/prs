using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using prs_api.Data;
using prs_api.Exceptions;
using prs_api.Models.Authentication;
using prs_api.Models.Configuration;
using prs_api.Services.Abstractions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.Helpers;

namespace prs_api.Services
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
                throw new Exception("Registration could not be confirmed");
            }
            if (identityResult.Succeeded)
            {
                return true;
            }

            throw new IdentityResultException("Registration could not be confirmed", identityResult);
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
                loginResponse.Token = generateJwtToken();

                return loginResponse;
            }

            throw new Exception(UserNameOrPasswordIncorrectError);
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

        private string generateJwtToken()
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtSettings = _configuration.GetSection("Jwt").Get<JwtSettingsModel>();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Key);
            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, "Admin")
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
